CREATE DATABASE notable;

CREATE TABLE doctors(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL
);

CREATE TABLE appointments(
  id SERIAL PRIMARY KEY,
  doctor_id INT REFERENCES doctors(id) NOT NULL,
  patient_first_name VARCHAR(255) NOT NULL,
  patient_last_name VARCHAR(255) NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME(4) NOT NULL
);

