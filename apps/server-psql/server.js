// Dependancies
const express = require("express");
const cors = require("cors");
const authorization = require("./middleware/authorization");
const { PrismaClient } = require("@prisma/client");

// Variables
const app = express();
const port = 3000;
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/seed", require("./controllers/seedController"));
app.use("/api/enquiries", require("./controllers/enquiryController"));
app.use("/api/auth", require("./controllers/authController"));
app.use("/api/staff", require("./controllers/staffController"));
app.use("/api/contacts", require("./controllers/contactController"));
app.use("/api/clients", require("./controllers/clientController"));
app.use("/api/vendors", require("./controllers/vendorController"));
app.use("/api/projects", require("./controllers/projectController"));

// Routes
// test route
app.get("/", (req, res) => {
    res.json({ msg: "psql test route for capstone project"})
});

// Listen on port
app.listen(port, () => {
    console.log("listening on port", port)
});