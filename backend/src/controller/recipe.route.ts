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

recipeRouter.get('/recipes/search/:search', async (req: Request, res: Response) => {
    try {
        console.log("search")
        const search = req.params.search;
        //search on title and description 
        const result  = await recipeService.searchRecipe(search);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ status: 'error'});
    }
});

recipeRouter.get('/recepis/filter/', async (req, res) => {
    try {
        // Extract query parameters
        
        const { type, duration, difficulty } = req.query;

        const result = await recipeService.filterRecipes(type, duration, difficulty);
        res.status(200).json(result);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).send('An error occurred while fetching recipes');
      }
    });




export { recipeRouter }