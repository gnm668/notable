const express = require("express");
const router = express.Router();
const pool = require("../db");

const appointment_time_check = appointment_time => {
  let appointment_minutes = parseInt(appointment_time.slice(3));
  if (appointment_minutes % 15 !== 0) {
    return false;
  } else {
    return true;
  }
};

//get all appointments for doctor on given day
router.get("/:doctor_id", async (req, res) => {
  try {
    const { doctor_id } = req.params;
    const { appointment_date } = req.body;
    const appointments = await pool.query(
      "SELECT * FROM appointments WHERE doctor_id = $1 \
      AND appointment_date = $2::date",
      [doctor_id, appointment_date]
    );
    res.json(appointments.rows);

  } catch (error) {
    res.status(404)
  }
});

//delete appointment for doctor -- (I included doctor_id because
//it provides a very thin layer of security and requires users to have 
//the doctor_id to user our api endpoint, I also figure that if we save 
//current user to the frontend, they can easily build it into the request)
router.delete("/:doctor_id/:appointment_id", async (req, res) => {
  try {
    const { doctor_id, appointment_id } = req.params;
    const deleted_appointment = await pool.query(
      "DELETE FROM appointments WHERE doctor_id = $1 \
      AND id = $2 returning *",
      [doctor_id, appointment_id]
    );

    //so that it fails loudly 
    if (!!deleted_appointment.rows[0] === true) {
      res.json("Appointment successfully deleted")
    } else {
      res.status(404).send("Failed to delete appointment");
    }
  
  } catch (error) {
    res.status(404).send("Failed to delete appointment");
  }
});

//create appointment for doctor
router.post("/:doctor_id", async (req, res) => {
  try {
    const { doctor_id } = req.params;
    const { patient_first_name, patient_last_name, appointment_date, appointment_time } = req.body;

    if (appointment_time_check(appointment_time) !== true) {
      res.status(404).send("Invalid time");
      return
    };

    const create_appointment = await pool.query(
      "INSERT INTO appointments (doctor_id, patient_first_name, patient_last_name, appointment_date, appointment_time) \
      VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [doctor_id, patient_first_name, patient_last_name, appointment_date, appointment_time]
    );

    res.json(create_appointment);

  } catch (error) {
    res.status(404).send("Failed to create appointment");
  }
});

module.exports = router;