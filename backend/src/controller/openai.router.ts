import express, { Request, Response} from 'express';
import {OpenAI} from "openai"
import recipeService from "../domain/service/recipe.service"
import { TextContentBlock } from 'openai/resources/beta/threads/messages';


const openai = new OpenAI({apiKey:process.env.OPENAI_SECRET_KEY});
const openAIRouter = express.Router();

openAIRouter.post('/', async (req: Request, res: Response) => {
  try {
    console.log("generate")
    const recipe = await recipeService.generateRecipe(req.body.message);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ status: 'error'});
  }
  /* const assistant = await openai.beta.assistants.retrieve(
    "asst_fDgYsQlhKOttJtOaHPujJESr"
  );  
  const thread = await openai.beta.threads.create();
  const message = await openai.beta.threads.messages.create(
    thread.id,
    {
      role: "user",
      content: req.body.message,
    }
  );

  
  let run = await openai.beta.threads.runs.createAndPoll(
    thread.id,
    {
      assistant_id: assistant.id,
    }
  );
  
  if (run.status == 'completed') {
    const messages = await openai.beta.threads.messages.list(run.thread_id);
    const lastMessage = messages.data.at(0);
    if (lastMessage?.role !== 'assistant') {
        res.status(500).json({ status: 'error'});
    }
    const assistantMessageContent = lastMessage?.content.at(0);
    if(!assistantMessageContent) {
      res.status(500).json({ status: 'error'});
    }
    if(assistantMessageContent?.type !== 'text'){
      res.status(500).json({ status: 'error'});
    }
    const textMessage = assistantMessageContent as TextContentBlock
    console.log(textMessage.text.value)
  } else {
    res.status(500).json({ status: 'error'});
  } */
});


  export {openAIRouter}