// Dependancies
const express = require("express");
const { PrismaClient } = require("@prisma/client");

const seedEnquiries = require("../seed-data/seedEnquiries");

// Variables
const router = express.Router();
const prisma = new PrismaClient();

// Routes
// test route
router.get("/test", (req, res) => {
    res.json({ msg: "test route for enquiry controller" });
});

// seed route
router.get("/seed", async (req, res) => {
    await prisma.enquiries.deleteMany();
    const enquiries = await prisma.enquiries.createMany(
        { data: seedEnquiries }
    );
    res.json(enquiries);
});

// create new enquiry
router.post("/new", async (req, res) => {
    try {
        const newEnquiry = await prisma.enquiries.create(
            { data: req.body }
        );
        res.status(201).json(newEnquiry);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// get all enquiries
router.get("/all", async (req, res) => {
    try {
        const enquiries = await prisma.enquiries.findMany({
            include: {
                accounts: true,
            },
        });

        if (!enquiries) {
            res.status(400).json({ error: "No enquiries found"});
        } else {
            res.status(200).json(enquiries);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
})

// Export
module.exports = router;