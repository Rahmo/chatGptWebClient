import OpenAI from "openai";
import express from 'express';
import bodyParser from "body-parser";
import cors from "cors"

const openai = new OpenAI({
    apiKey:"yourApiKey"
});

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req,res)=>{
    const { message } = req.body
    let completion;
    async function main() {
         completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: message}],
            model: "gpt-4-1106-preview",
        });
    }

    await main();
    console.dir(completion.choices[0]);
    res.json({
       completion:  completion.choices[0]
    })
})

app.listen(port,()=>{
    console.log(`example app is listening at ${port}`)
})