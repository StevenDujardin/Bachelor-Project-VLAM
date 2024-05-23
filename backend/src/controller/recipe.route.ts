import express, { Request, Response} from 'express';
import recipeService from "../domain/service/recipe.service"


const recipeRouter = express.Router();

recipeRouter.get('/recipes', async (req: Request, res: Response) => {
    try {
        console.log("allRecipes")
        const recipes  = await recipeService.getAllRecipes();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ status: 'error'});
    }
});

recipeRouter.get('/recipes/:id', async (req: Request, res: Response) => {
    try {
        console.log("getRecipeWithID")
        const id = Number(req.params.id)
        const recipe  = await recipeService.getRecipeWithID(id);
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ status: 'error'});
    }
});



export { recipeRouter }