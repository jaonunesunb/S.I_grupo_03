import "reflect-metadata";
import express from "express";
import "express-async-errors";
import cors from "cors";
import handleError from "./errors/handleError";
import userRoutes from "./routes/user/users.routes";
import eventRoutes from "./routes/events/events.routes";
import miscRoutes from "./routes/misc/misc.routes";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/user", userRoutes);
app.use("/event", eventRoutes);
app.use("/", miscRoutes);

app.use(handleError);

export default app;
