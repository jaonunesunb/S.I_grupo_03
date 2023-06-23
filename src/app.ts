import "reflect-metadata";
import express from "express";
import "express-async-errors";
import cors from "cors";
import handleError from "./errors/handleError";
import servidorRoutes from "./routes/user/users.routes";
import { loginRoutes } from "./routes/user/users.routes";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/servidor", servidorRoutes);

app.use("/login", loginRoutes)

app.use(handleError);

export default app;
