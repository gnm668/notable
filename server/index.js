const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", async (req, res) => {
  try {
    const todos = await pool.query(
      "SELECT * FROM test"
    );

    res.json(todos.rows);

  } catch (error) {
    res.json(error.message);
  }
});


app.listen(port, () => console.log(`Server is running on port ${port}`));