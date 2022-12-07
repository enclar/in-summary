// Dependancies
const express = require("express");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const seedStaff = require("../seed-data/seedStaff");

// Variables
const router = express.Router();
const saltRounds = 10;
const prisma = new PrismaClient();

// Encryption
const encryptedStaff = seedStaff.map((staff) => (
    {
        ...staff,
        password:  bcrypt.hashSync(staff.password, saltRounds)
    }
));

// Routes
// test route
router.get("/test", (req, res) => {
    res.json({ msg: "test route for staff controller" });
});

// seed route
router.get("/seed", async (req, res) => {
    await prisma.staff.deleteMany();
    const staff = await prisma.staff.createMany(
        { data: encryptedStaff }
    );
    res.status(201).json(staff);
});

module.exports = router;