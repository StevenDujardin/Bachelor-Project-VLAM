// src/index.ts
import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import { recipeRouter } from './src/controller/recipe.route';
import { openAIRouter } from './src/controller/openai.router';



const app = express();
dotenv.config();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Backend is runnning');
});
app.use(bodyParser.json());

app.use("/recipe-api", recipeRouter);
app.use("/kookai/API", openAIRouter)


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

