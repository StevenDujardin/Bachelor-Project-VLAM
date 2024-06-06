import express, { Request, Response} from 'express';
import recipeService from "../domain/service/recipe.service"
import path from 'path';
import multer from "multer";
import fs from 'fs';

const recipeRouter = express.Router();

/**
 * @swagger
 * /recipes/{id}:
 *   get:
 *     summary: Get recipe by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the recipe to retrieve
 *     responses:
 *       '200':
 *         description: A recipe object
 *         content:
 *           application/json:
 *       '404':
 *         description: No recipe found with this ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: No recipe found with this ID
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *     tags:
 *       - Recipes
 */
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


/**
 * @swagger
 * /recipes/search/{search}:
 *   get:
 *     summary: Search for recipes by title or description
 *     parameters:
 *       - in: path
 *         name: search
 *         required: true
 *         schema:
 *           type: string
 *         description: The search term to use
 *     responses:
 *       '200':
 *         description: A list of recipes matching the search term
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       '404':
 *         description: No recipes found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: No recipes found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *     tags:
 *       - Recipes
 */
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

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Filter recipes by type, duration, and difficulty
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: The type of recipes to filter
 *       - in: query
 *         name: duration
 *         schema:
 *           type: integer
 *         description: The maximum duration of recipes to filter
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *         description: The difficulty level of recipes to filter
 *     responses:
 *       '200':
 *         description: A list of filtered recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: An error occurred while fetching recipes
 *     tags:
 *       - Recipes
 */
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

/**
 * @swagger
 * /recipes/delete/{id}:
 *   delete:
 *     summary: Delete recipe by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the recipe to delete
 *     responses:
 *       '200':
 *         description: The deleted recipe object
 *         content:
 *           application/json:
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *     tags:
 *       - Recipes
 */
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

/**
 * @swagger
 * /recipes/edit/{id}:
 *   put:
 *     summary: Edit recipe by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the recipe to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               steps:
 *                 type: array
 *                 items:
 *                   type: string
 *               duration:
 *                 type: integer
 *               difficulty:
 *                 type: string
 *               type:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               image:
 *                 type: string
 *     responses:
 *       '200':
 *         description: The updated recipe object
 *         content:
 *           application/json:
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: An error occurred while editing
 *     tags:
 *       - Recipes
 */
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
  
  /**
 * @swagger
 * /recipes/image/upload:
 *   post:
 *     summary: Upload an image
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: File uploaded successfully
 *                 path:
 *                   type: string
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *     tags:
 *       - Recipes
 */
  recipeRouter.post('/image/upload/', upload.single('file'), async (req: Request, res: Response) => {
    try {
      console.log("uploadImage");
  
      if (!req.file) {
        throw new Error("File upload failed");
      }
  
      let fileLocation = req.file.path;
      res.sendFile(fileLocation);
  
      let fileUrl = `http://localhost:3000/recipes/image/${req.file.filename}`;
  
      // TODO: Write image location to DB
      // TODO: Retrieve location from DB and pull image in recipe overview
  

      res.status(200).json({ status: "File uploaded successfully", path: fileUrl });
    } catch (error: Error | any) {
      res.status(500).json({ status: error.message });
    }
  });


  /**
 * @swagger
 * /recipes/image/{filename}:
 *   get:
 *     summary: Get image by filename
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: The filename of the image to retrieve
 *     responses:
 *       '200':
 *         description: The image file
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       '404':
 *         description: Image not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Image not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: An error occurred while fetching the image
 *     tags:
 *       - Recipes
 */
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