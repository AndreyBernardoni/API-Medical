require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const CaregiverRoutes = require("./src/routes/Caregiver");
const AuthRoutes = require("./src/routes/Auth");

const app = express();

app.use(express.json());

const MONGO_URI = process.env.CONNECTION_STRING;

mongoose
  .connect(MONGO_URI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/caregiver", CaregiverRoutes);
app.use("/auth", AuthRoutes);
