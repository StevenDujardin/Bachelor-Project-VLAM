// src/index.ts
import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import { recipeRouter } from './controller/recipe.router';
import { openAIRouter } from './controller/openai.router';
import { userRouter } from './controller/user.router';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";

import cors from 'cors'; 

const URL_FRONTEND = process.env.URL_FRONTEND;

const app = express();
dotenv.config();
const port = 3000;

const swaggerOpts = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Back-end",
      version: "1.0.0",
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  apis: ["./src/controller/*.router.ts"],
};
app.use(cors({
  origin: URL_FRONTEND, // Replace with your frontend URL
  credentials: true, // Allow credentials (cookies) to be included
}));

const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use(cookieParser());

app.use(cors());
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', URL_FRONTEND);
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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


export default app;