// Dependancies
const express = require("express");
const cors = require("cors");

const userController = require("./controllers/userController");
const enquiryController = require("./controllers/enquiryController");
const staffController = require("./controllers/staffController");
const contactController = require("./controllers/contactController");
const clientController = require("./controllers/clientController");
const vendorController = require("./controllers/vendorController");
const projectController = require("./controllers/projectController");

// Variables
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/users", userController);
app.use("/api/enquiries", enquiryController);
app.use("/api/staff", staffController);
app.use("/api/contacts", contactController);
app.use("/api/clients", clientController);
app.use("/api/vendors", vendorController);
app.use("/api/projects", projectController);

// Routes
// test route
app.get("/", (req, res) => {
    res.json({ msg: "psql test route for capstone project"})
});

// Listen on port
app.listen(port, () => {
    console.log("listening on port", port)
});