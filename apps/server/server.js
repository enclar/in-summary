// Dependancies
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const staffController = require("./controllers/staffController");

// MongoDB Connection
mongoose.connect(process.env.mongoURI)

// Variables
const app = express();
const port = process.env.port

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/staff", staffController);

// Routes
// test route
app.get("/", (req, res) => {
    res.json({ msg: "test route for capstone project"})
});

// Confirm MongoDB Connection and Listen
mongoose.connection.on("connected", (req, res) => {
    console.log("connected to mongodb");

    app.listen(port, () => {
        console.log("listening on port", port)
    });
});