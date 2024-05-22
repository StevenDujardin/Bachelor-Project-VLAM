// src/index.ts

import { PrismaClient } from "@prisma/client";

const express =  require("express")
const dotenv = require("dotenv")
const prisma = require("./db/prisma");

const app = express();
const port = 3000;


app.get('/', async(req, res) => {
  res.send("Backend is running..")
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});