// Dependancies
const express = require("express");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const seedVendors = require("../seed-data/seedVendors");

// Variables
const router = express.Router();
const saltRounds = 10;
const prisma = new PrismaClient();

// Encryption
const encryptedVendors = seedVendors.map((vendor) => (
    {
        ...vendor,
        password: bcrypt.hashSync(vendor.password, saltRounds)
    }
));

// Routes
// test route
router.get("/test", (req, res) => {
    res.json({ msg: "test route for vendor controller" });
});

// seed route
router.get("/seed", async (req, res) => {
    await prisma.vendor.deleteMany();
    const vendors = await prisma.vendor.createMany(
        { data: encryptedVendors }
    );
    res.status(201).json(vendors);
});

module.exports = router;