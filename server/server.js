import express from "express";
import dotenv from "dotenv/config";
import cors from "cors";
import multer from "multer";
import connectDB from "./configDB/connectDB.js";

const app = express();

const PORT = process.env.PORT || 3999;

// middlewares
app.use(cors());
app.use(express.json());
app.use(multer().none());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Ok oK hai" });
});

await connectDB();
app.listen(PORT, () => {
  console.log(`server is running on the http://localhost:${PORT}`);
});
