// src/index.ts
import express from 'express';
import { recipeRouter } from './controller/recipe.route';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.use("/recipe-api", recipeRouter)


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

