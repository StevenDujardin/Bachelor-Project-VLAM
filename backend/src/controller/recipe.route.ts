import express, { Request, Response} from 'express';
import recipeService from "../domain/service/recipe.service"


const recipeRouter = express.Router();

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

recipeRouter.get('/', async (req, res) => {
    try {
        // Extract query parameters
        
        const type = req.query.type as string;
        const duration = Number(req.query.duration);
        const difficulty = req.query.difficulty as string;
        console.log(type)

        const result = await recipeService.filterRecipes(type, difficulty , duration);
        res.status(200).json(result);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).send('An error occurred while fetching recipes');
      }
});

recipeRouter.put('/edit/:id', async (req, res) => {
    try {
        // Extract query parameters
    
        const recipe_id = Number(req.params.id)
        const title = req.body.title as string;
        const description = req.body.description;
        const steps = req.body.steps;
        const duration = Number(req.query.duration);
        const difficulty = req.query.difficulty as string;
        const type = req.body.type;
        const ingredients = req.body.ingredients;
        console.log(steps)
        console.log(ingredients)

        const result = await recipeService.editRecipe(recipe_id, title, description, steps, duration, difficulty, type, ingredients);
        res.status(200).json(result);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).send('An error occurred while editing');
      }
});




export { recipeRouter }