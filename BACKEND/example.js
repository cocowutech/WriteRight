import express from 'express';
import cors from 'cors';
import db from "./db/db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import OpenAI from 'openai'
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json())
app.use(cors())
// configure opneai key
const openai = new OpenAI({
    apiKey: process.env.OpenAi,
})

// if not jwt, then means user is not logged in (repeated function becomes a const middleware)

const Checkifuserlogged = (req, res, next) => {

    const token = req.headers['authorization'];
    if (!token) {
        return res.status(400).json({error: 'You need to be logged in!'})
    }

    // jwt -> base64 (encoded) -> AOSUDNOnjsandoNOSANda==

    jwt.verify(token, 'SECRET_KEY', (err, decoded) => {
        if (err) {
            return res.status(400).json({error: 'JWT Token is Invalid!'})
        }
        // jwt -> {}
        req.user = decoded;

        next();
    })
}

app.get('/',(req,res)=> {
    res.json("Hello World");
})

app.post('/login',async(req,res) => {

    const { emailUsername, password } = req.body;

    const dbUser = await db("users").where({ 
        email: emailUsername,
    }).orWhere({ 
        username: emailUsername,
    }).first();

    if (!dbUser) {
        res.json({error: "Invalid Email or Username"});
        return;
    }

    if (!bcrypt.compareSync(password, dbUser.password)) {
        res.json({error: "Invalid Password"});
        return;
    }

    const userObject = {
        "id": dbUser.id,
        "email": dbUser.email,
        "username": dbUser.username,
        "remaining_tokens": dbUser.remaintoken
    }

    const jwtToken = jwt.sign(userObject, 'SECRET_KEY');

    // userObject (using this key (SECRET_KEY)) -> encrypt userObject

    res.json({
        "user": userObject,
        "jwt": jwtToken
    })
});

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    // ABCD
    
    db('users').insert({ username, email, password: hashedPassword, remaintoken: 2 })
      .then(ids => {
        res.status(201).json({ id: ids[0], username, email });
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Your username/email is already taken!Try another one'});
      });
  });



app.post('/update-profile', Checkifuserlogged, async (req, res) => {
    
    const { username , oldPassword, newPassword } = req.body;

    const { user } = req;

    if (!username && !oldPassword && !newPassword) {
        res.status(400).json({ error: "You must enter at least one field!"});
        return;
    }

    if (oldPassword && !newPassword) {
        res.status(400).json({ error: "You need to enter new password."});
        return;
    }

    if (newPassword && !oldPassword) {
        res.status(400).json({ error: "You need to enter old password."});
        return;
    }

    const dbUser = await db("users").where({ 
        email: user.email,
    }).orWhere({ 
        username: user.username,
    }).first();

    if (oldPassword && !bcrypt.compareSync(oldPassword, dbUser.password)) {
        res.status(400).json({error: "Invalid Password"});
        return;
    }

    // Check if the username already exists or not

    const checkExistingUsername = await db("users").where({
        username: username
    }).whereNot({
        username: user.username
    }).first();

    if (username && checkExistingUsername){
        res.status(400).json({ error: "The username is already taken."});
        return;
    }

    if (username) {

        const updateUsername = await db('users')
        .where({ email: user.email,})
        .orWhere({ username: user.username})
        .update({
            'username' : username
        })

        if (!updateUsername) {
            res.status(400).json({ error: "Error updating username."});
            return;
        }

    }

    if (newPassword) {

        const hashedPassword = bcrypt.hashSync(newPassword, 10);

        const updatePassword = await db('users')
        .where({ email: user.email,})
        .orWhere({ username: user.username})
        .update({
            'password' : hashedPassword
        })

        if (!updatePassword) {
            res.status(400).json({ error: "Error updating password."});
            return;
        }

    }

    res.status(200).json({ success: "Fields updated successfully!"});

});
  
app.post('/submit-paper', Checkifuserlogged, async (req,res) => {

    const { content } = req.body;

    const user = req.user;

    if (!content) {
        return res.status(400).json({ error: 'No content' });
    }

    // frontend - user info to backend 
    // select condition, if the remaining token = 0, then return,
    const dbRemaintoken = await db("users")
    .select('remaintoken')
    .where({ email: user.email,})
    .first();

    // knex return an object , status 400 is forbidden
    if (dbRemaintoken.remaintoken < 1) {
        res.status(400).json({ error: "You don't have more token for today"});
        return;
    } 

    const openAiParam = {
        messages: [
            {
                role: 'system',
                content: 'Please evaluate the TOEFL article submitted by the user and provide a score (out of 30 as full score) for the writing section based on its structure, grammar, coherence, and use of language. Only the score should be returned, without detailed feedback or comments.'
            }
            ,
            {
                role: 'user',
                content: content
            }],
        model: 'gpt-3.5-turbo'
    }

    const updateRemainingToken = await db('users')
    .where({ email: user.email,})
    .update({
        'remaintoken' : dbRemaintoken.remaintoken-1,
    })

    const updatedRemainingToken = await db("users")
    .select('remaintoken')
    .where({ email: user.email,})
    .first();

    const chatCompletion = await openai.chat.completions.create(openAiParam)

    res.send({score: chatCompletion.choices[0].message.content,remaining_token: updatedRemainingToken.remaintoken});

    // res.send({score: chatCompletion, remaining_token: updatedRemainingToken.remaintoken });
});

app.post('/improve', Checkifuserlogged, async(req,res) => {
    const { content } = req.body; 
    
    const user = req.user;

    if (!content) {
        return res.status(400).json({ error: 'No content' });
    }
    
    const dbRemaintoken = await db("users")
    .select('remaintoken')
    .where({ email: user.email,})
    .first();

    // knex return an object , status 400 is forbidden
    if (dbRemaintoken.remaintoken < 1) {
        res.status(400).json({ error: "You don't have more token for today"});
        return;
    } 

    const openAiParam = {
        messages: [
            {
                role: 'system',
                content: 'Please enhance the clarity, coherence, and overall language quality of the TOEFL article submitted by the user, while ensuring the original meaning and context are preserved. Provide feedback on grammar, vocabulary, and structure improvements.'
            },
            {
            role: 'user',
            content: content
        }],
        model: 'gpt-3.5-turbo'
    }

    const updateRemainingToken = await db('users')
    .where({ email: user.email,})
    .update({
        'remaintoken' : dbRemaintoken.remaintoken-1,
    })

    const updatedRemainingToken = await db("users")
    .select('remaintoken')
    .where({ email: user.email,})
    .first();

    const chatCompletion = await openai.chat.completions.create(openAiParam)

    res.send({content: chatCompletion.choices[0].message.content, remaining_token: updatedRemainingToken.remaintoken});
});

app.post('/profile', Checkifuserlogged, async(req,res) => {
    const user = req.user;

    const dbUser = await db("users").where({ 
        email: user.email,
    }).first();

    const userObject = {
        "id": dbUser.id,
        "email": dbUser.email,
        "username": dbUser.username,
        "remaining_tokens": dbUser.remaintoken
    }

    const jwtToken = jwt.sign(userObject, 'SECRET_KEY');

    res.json({
        "user": userObject,
        "jwt": jwtToken
    })
    
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})

// Apr.17

// backend: openai call✅
// do the improve content part; ✅

// frontend: visitor : toefl writing grader redirect to login page ✅
// frontend: about us page ✅

// render of the remaining token
// user info - reflect page 
// clean routes
// deploy on ..... (render)


