import { Recipe } from "../model/recipe";
import recipeDb from "../data-access/recipe.db"
import {OpenAI} from "openai"
import { TextContentBlock } from 'openai/resources/beta/threads/messages';
import { Ingredient } from "@prisma/client";

const getAllRecipes = (): Promise<Recipe[]> => {
    return recipeDb.DBgetAllRecipes();
};

const getRecipeWithID = (id : number): Promise<Recipe> => {
    return recipeDb.DBgetRecipesWithID(id);
};

const searchRecipe = async (search : string): Promise<Recipe[]> => {
    return await recipeDb.DBsearchRecipe(search);
};

const editRecipe = async (recipe_id: number, title: string, description: string, steps: string[], duration: number, difficulty: string, type: string, ingredients: string[], location: string): Promise<Recipe> => {
  return await recipeDb.DBeditRecipe(recipe_id, title, description, steps, duration, difficulty, type, ingredients, location);
};

const deleteRecipeWithID = async (recipe_id: number): Promise<Recipe> => {
  return await recipeDb.DBdeleteRecipeWithID(recipe_id);
};

const filterRecipes = (typeDish: string, difficulty: string, duration: number): Promise<Recipe[]> => {
  return recipeDb.DBfilterRecipes(typeDish, difficulty, duration);
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
        return recipeDb.DBinsertRecipe(textJson.title, textJson.description, textJson.steps, textJson.duration as number, textJson.difficulty, textJson.type, textJson.ingredients);
        
      } else {
        throw new Error('Interactie met de assistent kon niet succesvol worden uitgevoerd.');
      }
}


const getAllIngredients = (): Promise<Ingredient[]> => {
  return recipeDb.DBgetAllIngredients();
};

const deleteIngredientByName = async (name: string): Promise<Ingredient> => {
  const ingredient_id = await getIngredientIDByName(name) as unknown as number;
  return recipeDb.DBdeleteIngredientByID(ingredient_id);
}

const getIngredientIDByName = async (name: string): Promise<number> => {
  return await recipeDb.DBgetIngredientIDByName(name);
};



export default { getAllRecipes, getRecipeWithID, generateRecipe, searchRecipe, filterRecipes, getAllIngredients, deleteRecipeWithID, deleteIngredientByName, getIngredientIDByName, editRecipe }
