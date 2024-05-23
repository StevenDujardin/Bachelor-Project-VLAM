import express, { Request, Response} from 'express';
import { Configuration, OpenAIApi} from "openai"

const openAIRouter = express.Router();

// OpenAI configuration creation
const configuration = new Configuration({
    apiKey: process.env.OPENAI_SECRET_KEY,
  });
  // OpenAI instance creation
  const openai = new OpenAIApi(configuration);
  
  openAIRouter.get('/api', async (req, res) => {
    let answer = openai.send(req.body)
    res.send(answer);
  });

  export {openAIRouter}