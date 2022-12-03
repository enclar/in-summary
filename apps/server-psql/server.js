// Dependancies
const express = require("express");

const userController = require("./controllers/userController");

// Variables
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use("/api/users", userController);

// Routes
// test route
app.get("/", (req, res) => {
    res.json({ msg: "psql test route for capstone project"})
});

// Listen on port
app.listen(port, () => {
    console.log("listening on port", port)
});