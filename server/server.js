import express from "express";
import cors from "cors";
import pg from "pg";
import jwt from "jsonwebtoken";
import "dotenv/config";

// variables
const app = express();
const port = process.env.SERVER_PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

// db setup
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});
(async () => {
  await db.connect();
})();

// routes
// check and get user email
app.get("/users/:email", async (req, res) => {
  try {
    const { email } = req.params;
    return res.json("success");
  } catch (err) {
    console.error("Can't get email: ", err.message);
    return res.json("error");
  }
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
