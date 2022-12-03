// Dependancies
const express = require("express");

const Enquiry = require("../models/Enquiry");

const seedEnquiries = require("../seed-data/seedEnquiries");

// Variables
const router = express.Router();

// Routes
// test route
router.get("/", (req, res) => {
    res.json({ msg: "test route for enquiry controller" })
});

// seed route
router.get("/seed", async (req, res) => {
    await Enquiry.deleteMany();
    const enquiries = await Enquiry.insertMany(seedEnquiries);
    res.status(201).json(enquiries)
});

// add an enquiry
router.post("/add", async (req, res) => {
    console.log("req body:", req.body);

    try {
        const newEnquiry = await Enquiry.create(req.body);
        if (!newEnquiry) {
            res.status(400).json({ error: "Unable to create new enquiry" });
        } else {
            res.status(201).json(newEnquiry);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Export
module.exports = router;