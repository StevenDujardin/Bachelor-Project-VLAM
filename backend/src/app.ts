// src/index.ts
import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import { recipeRouter } from './controller/recipe.router';
import { openAIRouter } from './controller/openai.router';
import { userRouter } from './controller/user.router';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import cors from 'cors'; 


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

const swaggerSpec = swaggerJSDoc(swaggerOpts);

app.use(cors());

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