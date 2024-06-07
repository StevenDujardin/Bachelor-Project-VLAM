import express, { Request, Response} from 'express';
import recipeService from "../domain/service/recipe.service"
import path from 'path';
import multer from "multer";
import fs from 'fs';

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
      console.log("search");
      const search = req.params.search;

      const page = parseInt(req.query.page as string);
      const pageSize = parseInt(req.query.pageSize as string);

      // Calculate the start and end indexes for the requested page
      const startIndex = (page - 1) * pageSize;
      const endIndex = page * pageSize;

      const result = await recipeService.searchRecipe(search);

      const paginatedResult = result.slice(startIndex, endIndex);

      const totalPages = Math.ceil(result.length / pageSize);
      res.status(200).json({ data: paginatedResult, totalPages });
  } catch (error) {
      res.status(500).json({ status: 'error' });
  }
});

recipeRouter.get('/', async (req, res) => {
    try {
        // Extract query parameters

        const page = parseInt(req.query.page as string);
        const pageSize = parseInt(req.query.pageSize as string);
  

        
        const type = req.query.type as string;
        const duration = Number(req.query.duration);
        const difficulty = req.query.difficulty as string;

          // Calculate the start and end indexes for the requested page
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;

        const result = await recipeService.filterRecipes(type, difficulty , duration);
        const paginatedResult = result.slice(startIndex, endIndex);

        // Calculate the total number of pages
  const totalPages = Math.ceil(result.length / pageSize);

        res.status(200).json({ data: paginatedResult, totalPages });
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
        const description = req.body.description as string;
        const steps = req.body.steps;
        const duration = Number(req.body.duration);
        const difficulty = req.body.difficulty as string;
        const type = req.body.type as string;
        const ingredients = req.body.ingredients;
        const image = req.body.image as string;
        console.log(req.body)

        const result = await recipeService.editRecipe(recipe_id, title, description, steps, duration, difficulty, type, ingredients, image);
        res.status(200).json(result);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).send('An error occurred while editing');
      }
});


  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../../images/'));
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage });
  
  recipeRouter.post('/image/upload/', upload.single('file'), async (req: Request, res: Response) => {
    const API_URL = process.env.API_URL;
    try {
      console.log("uploadImage");
  
      if (!req.file) {
        throw new Error("File upload failed");
      }
  
      let fileLocation = req.file.path;
      res.sendFile(fileLocation);
  
      let fileUrl = `${API_URL}/recipes/image/${req.file.filename}`;
  
      // TODO: Write image location to DB
      // TODO: Retrieve location from DB and pull image in recipe overview
  

      res.status(200).json({ status: "File uploaded successfully", path: fileUrl });
    } catch (error: Error | any) {
      res.status(500).json({ status: error.message });
    }
  });

recipeRouter.get('/image/:filename', async (req: Request, res: Response) => {
    try {
        console.log("getImage");
        const filename = req.params.filename;
        const directoryPath = path.join(__dirname, '../../images/');
        const imagePath = path.join(directoryPath, filename);

        // Check if file exists before sending it
        if (fs.existsSync(imagePath)) {
            res.sendFile(imagePath);
        } else {
            res.status(404).json({ status: 'error', message: 'Image not found' });
        }
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).send('An error occurred while fetching the image');
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