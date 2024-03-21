import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json())
app.use(cors())

app.get('/',(req,res)=> {
    res.send("Hello World");
})

app.post('/submit-paper',async(req,res) => {
    const { content } = req.body;
    res.send({score: "Dummy Data", remaining_token: 1});
});

app.post('/improve',async(req,res) => {
    const { content } = req.body;
    res.send({content: "Renewed Content", remaining_token: 0});
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})