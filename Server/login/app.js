import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import register from "./register.js";
import login from "./login.js";
import "./db.js"; 

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.post("/signup", register);
app.post("/login", login);

app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT}`);
});

export default app;