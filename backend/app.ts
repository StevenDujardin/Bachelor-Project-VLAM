// src/index.ts
import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
<<<<<<< Updated upstream
import { recipeRouter } from './src/controller/recipe.route';
=======
import { recipeRouter } from './controller/recipe.route';
import { Configuration, OpenAIApi} from "openai"
>>>>>>> Stashed changes

const app = express();
dotenv.config();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Backend is runnning');
});
app.use(bodyParser.json());

app.use("/recipe-api", recipeRouter)


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// OpenAI configuration creation
const configuration = new Configuration({
  apiKey: process.env.OPENAI_SECRET_KEY,
});
// OpenAI instance creation
const openai = new OpenAIApi(configuration);

app.get('/api', async (req, res) => {
  let answer = openai.send(req.body)
  res.send(answer);
});