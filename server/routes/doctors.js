const express = require("express");
const router = express.Router();
const pool = require("../db");

//get all doctors
router.get("/", async (req, res) => {
  try {
    const all_doctors = await pool.query("SELECT * FROM doctors");
    res.json(all_doctors.rows);

  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;