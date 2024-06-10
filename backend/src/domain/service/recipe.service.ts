import { Recipe } from "../model/recipe";
import recipeDb from "../data-access/recipe.db"
import {OpenAI} from "openai"
import { TextContentBlock } from 'openai/resources/beta/threads/messages';
import { Ingredient } from "@prisma/client";
import axios from "axios";
import fs from 'fs';
import crypto from 'crypto';
import sharp from "sharp";

const getAllRecipes = (): Promise<Recipe[]> => {
    return recipeDb.DBgetAllRecipes();
};

const getRecipeWithID = (id : number): Promise<Recipe> => {
    return recipeDb.DBgetRecipesWithID(id);
};

const searchRecipe = async (search : string): Promise<Recipe[]> => {
    return await recipeDb.DBsearchRecipe(search);
};

const editRecipe = async (recipe_id: number, title: string, description: string, steps: string[], duration: number, difficulty: string, type: string, ingredients: string[], image: string): Promise<Recipe> => {
  return await recipeDb.DBeditRecipe(recipe_id, title, description, steps, duration, difficulty, type, ingredients, image);
};

const deleteRecipeWithID = async (recipe_id: number): Promise<Recipe> => {
  return await recipeDb.DBdeleteRecipeWithID(recipe_id);
};

const filterRecipes = (typeDish: string, difficulty: string, duration: number): Promise<Recipe[]> => {
  return recipeDb.DBfilterRecipes(typeDish, difficulty, duration);
};



const downloadImage = async (url: string | undefined, filename: string): Promise<void> => {
  // Ensure url is defined
  if (!url) throw new Error('URL is undefined');

  const path = `images/${filename}.png`;
  const writer = fs.createWriteStream(path);

  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', async () => {
      try {
        // Process the image and save it to a temporary file
        await sharp(path)
          .resize(1024, 1024, {
            fit: sharp.fit.inside,
            withoutEnlargement: true
          })
          .toFormat('jpeg', { quality: 80 })
          .toFile(`./images/compressed-${filename}.jpeg`); // Changed extension to jpeg

        // Delete the original image
        fs.unlinkSync(path);
        
        console.log(`Image downloaded and processed successfully: ${filename}`);
        resolve();
      } catch (error) {
        reject(error);
      }
    });

    writer.on('error', (error) => {
      // Delete the partially written file in case of an error
      fs.unlinkSync(path);
      reject(error);
    });
  });
};



const generateRecipe = async (prompt: string, type: string, difficulty: string, duration: string): Promise<Recipe> => {
    const API_URL = process.env.API_URL;
    const openai = new OpenAI({apiKey:process.env.OPENAI_SECRET_KEY});
    const assistant = await openai.beta.assistants.retrieve(
        "asst_fDgYsQlhKOttJtOaHPujJESr"
      );  
      let finalPrompt = prompt;
      if(type) {
        finalPrompt += ` Het recept moet een ${type} zijn.`
      }
      if(difficulty) {
        finalPrompt += ` Het moet een ${difficulty} recept zijn.`;
      } 
      if(duration) {
        finalPrompt += ` Het moet minder dan ${duration} minuten duren om te maken.`
      }
      const thread = await openai.beta.threads.create();
      const message = await openai.beta.threads.messages.create(
        thread.id,
        {
          role: "user",
          content: finalPrompt,
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
        const imagePrompt = textJson.imagePrompt;
        const resp = await openai.images.generate({ model: "dall-e-3", prompt: imagePrompt, style: "vivid", n: 1 });
        const image = resp.data[0].url;
        const filename = crypto.randomBytes(16).toString('hex');
        await downloadImage(image, filename);

        return recipeDb.DBinsertRecipe(textJson.title, textJson.description, textJson.steps, textJson.duration as number, textJson.difficulty, textJson.type, textJson.ingredients, `${API_URL}/recipes/image/compressed-${filename}.jpeg`);
        
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
