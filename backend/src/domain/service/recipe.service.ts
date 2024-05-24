import { Recipe } from "../model/recipe";
import recipeDb from "../data-access/recipe.db"
import {OpenAI} from "openai"
import { TextContentBlock } from 'openai/resources/beta/threads/messages';

const getAllRecipes = (): Promise<Recipe[]> => {
    return recipeDb.DBgetAllRecipes();
};

const getRecipeWithID = (id : number): Promise<Recipe> => {
    return recipeDb.DBgetRecipesWithID(id);
};

const searchRecipe = (search : string): Promise<Recipe[]> => {
    return recipeDb.DBsearchRecipe(search);
};

interface FilterParams {
  type?: string;
  difficulty?: string;
  durations?: string[];
}

const filterRecipes = (typeDish: string, difficulty: string, durations: string[]): Promise<Recipe[]> => {
  return recipeDb.DBfilterRecipes(typeDish, difficulty, durations);
};

const generateRecipe = async (prompt: string): Promise<Recipe> => {
    const openai = new OpenAI({apiKey:process.env.OPENAI_SECRET_KEY});
    const assistant = await openai.beta.assistants.retrieve(
        "asst_fDgYsQlhKOttJtOaHPujJESr"
      );  
      const thread = await openai.beta.threads.create();
      const message = await openai.beta.threads.messages.create(
        thread.id,
        {
          role: "user",
          content: prompt,
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
            throw new Error('Het laatste bericht was niet gegeven door de assistent.');
        }
        const assistantMessageContent = lastMessage?.content.at(0);
        if(!assistantMessageContent) {
            throw new Error('Er waren geen bericten gegeven door de assistent.');
        }
        if(assistantMessageContent?.type !== 'text'){
            throw new Error('Het laatste bericht was geen tekstbericht.');
        }
        const textMessage = assistantMessageContent as TextContentBlock
        const textJson = JSON.parse(textMessage.text.value);
        if ("warning" in textJson) {
            console.log(textJson.warning);
            throw new Error(textJson.warning);
        }
        return recipeDb.DBinsertRecipe(textJson.title, textJson.description, textJson.steps, textJson.duration, textJson.difficulty, textJson.type, textJson.ingredients);
        
      } else {
        throw new Error('Interactie met de assistent kon niet succesvol worden uitgevoerd.');
      }
}


export default { getAllRecipes, getRecipeWithID, generateRecipe, searchRecipe, filterRecipes }
