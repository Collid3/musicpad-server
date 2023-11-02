require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");

const userRoute = require("./routes/user");
const authRoute = require("./controller/auth");
const songRoute = require("./routes/song");

connectDB();

app.use(cors({ origin: "https://musicpad.onrender.com" }));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));

app.use("/song", songRoute);
app.use("/user", userRoute);
app.use("/auth", authRoute);

mongoose.connection.once("connected", () => {
  console.log("Connected to the database");
  app.listen(4000, () => {
    console.log("Server running on port: 4000");
  });
});
