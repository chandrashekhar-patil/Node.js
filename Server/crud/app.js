import express from "express";
import cors from "cors";
import userRoutes from "./routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", userRoutes);

app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT}`);
});
    