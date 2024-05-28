import express, { Request, Response} from 'express';
import recipeService from "../domain/service/recipe.service"


const recipeRouter = express.Router();

//Get recipe with ID
recipeRouter.get('/:id', async (req, res) => {
    try {
        console.log("getRecipeWithID")
        const id = Number(req.params.id)
        const recipe  = await recipeService.getRecipeWithID(id);
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ status: 'error'});
    }
});

//Search recipe
recipeRouter.get('/search/:search', async (req: Request, res: Response) => {
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

//Get all recipes with filter
recipeRouter.get('/', async (req, res) => {
    try {
        const type = req.query.type as string;
        const duration = Number(req.query.duration);
        const difficulty = req.query.difficulty as string;

        const result = await recipeService.filterRecipes(type, difficulty , duration);
        res.status(200).json(result);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).send('An error occurred while fetching recipes');
      }
});

recipeRouter.get('/ingredients', async (req, res) => {
    try {
        console.log("Ingredients")
        const result = await recipeService.getAllIngredients();
        res.status(200).json(result);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).send('An error occurred while fetching recipes');
      }
});





export { recipeRouter }