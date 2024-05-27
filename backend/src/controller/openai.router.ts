import express, { Request, Response} from 'express';
import recipeService from "../domain/service/recipe.service"


const openAIRouter = express.Router();

openAIRouter.post('/', async (req: Request, res: Response) => {
  try {
    console.log("generate")
    const recipe = await recipeService.generateRecipe(req.body.message);
    res.status(200).json(recipe);
  } catch (error: Error | any) {
    res.status(500).json({ status: error.message});
  }
});


  export {openAIRouter}