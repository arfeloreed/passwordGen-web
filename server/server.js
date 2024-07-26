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
// const db = new pg.Client({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASS,
//   port: process.env.DB_PORT,
// });
const db = new pg.Client({ connectionString: process.env.DATABASE_URL });
(async () => await db.connect())();

// routes
// check and get user email
app.get("/users/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const query = "SELECT name, email FROM users where email=$1";
    const result = await db.query(query, [email.toLowerCase()]);
    if (result.rows.length !== 0) return res.json({ message: "login" });
    else return res.json({ message: "register" });
  } catch (err) {
    console.error("Can't get email: ", err.message);
    return res.json({ message: "error" });
  }
});
// register a user through google
app.post("/register/google", async (req, res) => {
  const { name, email, google_id } = req.body;
  try {
    const query =
      "INSERT INTO users(name, email, google_id) VALUES($1, $2, $3) RETURNING *";
    const result = await db.query(query, [name, email.toLowerCase(), google_id]);
    const data = result.rows[0];
    if (data) {
      const token = jwt.sign(
        {
          id: data.user_id,
          name: data.name,
          email: data.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      return res.json({ message: "success", token });
    } else return res.json({ message: "error" });
  } catch (err) {
    console.error("Can't register user: ", err.message);
    return res.json({ message: "error" });
  }
});
// logging in a user through google
app.post("/login/google", async (req, res) => {
  const { google_id } = req.body;
  try {
    const query = "SELECT * FROM users WHERE google_id=$1";
    const result = await db.query(query, [google_id]);
    const data = result.rows[0];
    if (data) {
      const token = jwt.sign(
        {
          id: data.user_id,
          name: data.name,
          email: data.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      return res.json({ message: "success", token });
    } else return res.json({ message: "error" });
  } catch (err) {
    console.error("Can't login user: ", err.message);
    return res.json({ message: "error" });
  }
});
// adding a password to user
app.post("/:user_id/add/password", async (req, res) => {
  const { user_id } = req.params;
  const { website, email, password } = req.body;
  try {
    const query =
      "INSERT INTO passwords(user_id,website,email,password) VALUES($1,$2,$3,$4)";
    await db.query(query, [user_id, website, email.toLowerCase(), password]);
    return res.json({ message: "success" });
  } catch (err) {
    console.error("Can't add password: ", err.message);
    return res.json({ message: "error" });
  }
});
// get all passwords for user
app.get("/dashboard/:user_id/passwords", async (req, res) => {
  const { user_id } = req.params;
  try {
    const query = "SELECT password_id,website,email FROM passwords WHERE user_id=$1";
    const result = await db.query(query, [parseInt(user_id)]);
    return res.json({ message: "success", data: result.rows });
  } catch (err) {
    console.error("Can't get passwords for user: ", err.message);
    return res.json({ message: "error" });
  }
});
// get account detail for a password with previous passwords
app.get("/dashboard/account/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let query = "SELECT website,email,password FROM passwords where password_id=$1";
    const result1 = await db.query(query, [parseInt(id)]);
    // update query to get previous passwords
    query =
      "SELECT password FROM prev_passwords where password_id=$1 ORDER BY prev_password_id DESC";
    const result2 = await db.query(query, [parseInt(id)]);
    return res.json({
      message: "success",
      data: result1.rows[0],
      prevPasswords: result2.rows,
    });
  } catch (err) {
    console.error("Error connecting to db: ", err.message);
    return res.json({ message: "error" });
  }
});
// updating a password
app.patch("/update/password/:id", async (req, res) => {
  const { id } = req.params;
  const { newEmail, password } = req.body;
  try {
    let query = "SELECT password FROM passwords WHERE password_id=$1";
    let result = await db.query(query, [id]);
    const { password: prevPass } = result.rows[0];
    query = "UPDATE passwords SET email=$1,password=$2 WHERE password_id=$3";
    await db.query(query, [newEmail, password, id]);
    try {
      query = "INSERT INTO prev_passwords(password_id, password) VALUES($1,$2)";
      await db.query(query, [id, prevPass]);
    } catch (err) {
      console.error("Can't update prev passwords: ", err.message);
      return res.json({ message: "error" });
    }
    return res.json({ message: "success" });
  } catch (err) {
    console.error("Can't update passwords: ", err.message);
    return res.json({ message: "error" });
  }
});
// deleting a password
app.delete("/account/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const query = "DELETE FROM passwords WHERE password_id=$1";
    await db.query(query, [parseInt(id)]);
    return res.json({ message: "success" });
  } catch (err) {
    console.error("Can't delete account: ", err.message);
    return res.json({ message: "error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
