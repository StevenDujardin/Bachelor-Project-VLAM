// src/index.ts
import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import { recipeRouter } from './controller/recipe.route';
import { openAIRouter } from './controller/openai.router';
import { userRouter } from './controller/user.router';
import cookieParser from 'cookie-parser';


import cors from 'cors'; 


const app = express();
dotenv.config();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:3001', // Replace with your frontend URL
  credentials: true, // Allow credentials (cookies) to be included
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
   res.header('Access-Control-Allow-Credentials', 'true');
   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
   next();
});

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


export default app;