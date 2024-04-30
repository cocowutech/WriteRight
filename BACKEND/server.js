import express from 'express';
import Pool from 'pg';
import {Configuration, OpenAIapi} from 'openai';

const pool = new Pool({
    user: 'your_database_user',
    host: 'your_database_host',
    database: 'your_database_name',
    password: 'your_database_password',
    port: 5432
})


const app = express();
app.use(express.json())

const configuration = new Configuration({
    apiKey:'',
    bathPath:'',
})

const openai = new OpenAIapi(configuration);


app.get('/',(req,res)=> {
    res.send("Hello World");
})

app.post('/submit-paper',async(req,res) => {
    const { content } = req.body;
    openai.createCompletion({
        model:'text-davinci-003',
        prompt:content,
        maxTokens: 500,
    }).then((response) => {
        res.send(response.data.choices[0].text);
        }).catch((error) => {
        console.error(error);
        });
    })

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})