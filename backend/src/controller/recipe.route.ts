import express, { Request, Response} from 'express';
import recipeService from "../domain/service/recipe.service"
import path from 'path';

const recipeRouter = express.Router();

recipeRouter.get('/:id', async (req, res) => {
    try {
        console.log("getRecipeWithID")
        const id = Number(req.params.id)
        const recipe  = await recipeService.getRecipeWithID(id);
        if(!recipe){
            res.status(404).json({ status: 'error', message: 'No recipe found with this ID'})
        }
        else{
            res.status(200).json(recipe);
        }
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
        if(result.length === 0){
            res.status(404).json({ status: 'error', message: 'No recipes found'})
        }
        else{
            res.status(200).json(result);
        }
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

        const result = await recipeService.filterRecipes(type, difficulty , duration);
        res.status(200).json(result);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).send('An error occurred while fetching recipes');
      }
});


recipeRouter.delete('/delete/:id', async (req, res) => {
    try {
        console.log("deleteRecipeWithID")
        const id = Number(req.params.id);
        const recipe  = await recipeService.deleteRecipeWithID(id);

        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ status: 'error'});
    }
});


recipeRouter.put('/edit/:id', async (req, res) => {
    try {
        // Extract query parameters
        console.log("editRecipe")

        const recipe_id = Number(req.params.id)
        const title = req.body.title as string;
        const description = req.body.description;
        const steps = req.body.steps;
        const duration = req.body.duration as unknown as number;
        const difficulty = req.body.difficulty as string;
        const type = req.body.type;
        const ingredients = req.body.ingredients;
        const location = req.body.location;
        console.log(steps)
        console.log(ingredients)
        console.log(duration)


        const result = await recipeService.editRecipe(recipe_id, title, description, steps, duration, difficulty, type, ingredients, location);
        res.status(200).json(result);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).send('An error occurred while editing');
      }
});

recipeRouter.post('/image/upload/:file*', async (req: Request, res: Response) => {
    try {
      console.log("uploadImage")
      let file = req.params.file;
      let fileLocation = path.join(__dirname,'../backend/images/', file);
      res.sendFile(`${fileLocation}`)
      res.status(200).json({ status: "File uploaded successfully", path: fileLocation });
    } catch (error: Error | any) {
      res.status(500).json({ status: error.message});
    }
  });
  



//Delete ingredient by name
// recipeRouter.delete('/delete/ingredient/:name', async (req, res) => {
//     try {
//         console.log("deleteRecipeWithName")
//         const name = req.params.name as string;
//         const ingredient  = await recipeService.deleteIngredientByName(name);

//         res.status(200).json(ingredient);
//     } catch (error) {
//         res.status(500).json({ status: 'error'});
//     }
// });








export { recipeRouter }