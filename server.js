import express from "express";
import fileUpload from "express-fileupload";
import xss from "xss";
import sqlite3 from "sqlite3";
import { v4 } from "uuid";
import keys from "./keys";

const app = express();
const db = new sqlite3.Database("appointments.db");

// create table
db.run(
  "CREATE TABLE IF NOT EXISTS appointments (id TEXT, name TEXT, email TEXT, phone TEXT, time TEXT, date TEXT, file TEXT)"
);

// set up middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

// post route to create appointment
app.post("/appointments", (req, res) => {
  const { name, email, phone, time, date } = req.body;

  if (!name || !email || !phone || !time || !date) {
    return res.status(400).json({
      error: true,
      message: "Por favor, llene todos los campos del formulario.",
    });
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      error: true,
      message: "Por favor, adjunte su documento de precualificación",
    });
  }

  const file = req.files.file;

  if (file.mimetype !== "application/pdf") {
    return res.status(422).json({
      error: true,
      message: "Solo se aceptan files de tipo PDF",
    });
  }

  if (file.size > 5 * 1024 * 1024) {
    return res.status(422).json({
      error: true,
      message: "El archivo no puede exceder los 5MB",
    });
  }

  return res.status(201).json({
    error: false,
    message: "Le hemos creado su sita exitosamente.",
  });
});

// run server
app.listen(keys.port, () => console.log(`Server running on port ${keys.port}`));
