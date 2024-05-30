// src/index.ts
import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import { recipeRouter } from './src/controller/recipe.route';
import { openAIRouter } from './src/controller/openai.router';
import { userRouter } from './src/controller/user.router';

import cors from 'cors'; 


const app = express();
dotenv.config();
const port = 3000;

app.use(cors());


app.get('/', (req, res) => {
  res.send('Backend is runnning');
});
app.use(bodyParser.json());

app.use("/recipes", recipeRouter);
app.use("/generate", openAIRouter)
app.use("/users", userRouter)


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
