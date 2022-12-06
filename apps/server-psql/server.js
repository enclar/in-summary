// Dependancies
const express = require("express");

const userController = require("./controllers/userController");
const enquiryController = require("./controllers/enquiryController");

// Variables
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use("/api/users", userController);
app.use("/api/enquiries", enquiryController);

// Routes
// test route
app.get("/", (req, res) => {
    res.json({ msg: "psql test route for capstone project"})
});

// Listen on port
app.listen(port, () => {
    console.log("listening on port", port)
});