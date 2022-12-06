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

// Export
module.exports = router;