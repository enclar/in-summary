// Dependancies
const express = require("express");
const { PrismaClient } = require("@prisma/client");

const seedVendors = require("../seed-data/seedVendors");

// Variables
const router = express.Router();
const prisma = new PrismaClient();

// Routes
// test route
router.get("/test", (req, res) => {
    res.json({ msg: "test route for vendor controller" });
});

// seed route
router.get("/seed", async (req, res) => {
    await prisma.vendor.deleteMany();
    const vendors = await prisma.vendor.createMany(
        { data: seedVendors }
    );
    res.status(201).json(vendors);
});

module.exports = router;