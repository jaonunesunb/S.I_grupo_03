import "reflect-metadata";
import "express-async-errors";
import express from "express";
import "reflect-metadata";
import cors from "cors";
import handleError from "./src/errors/handleError";

const app = express();

app.use(express.json());
app.use(cors());

app.use(handleError);

export default app;
