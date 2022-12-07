// Dependancies
const express = require("express");
const { PrismaClient } = require("@prisma/client");

const seedContacts = require("../seed-data/seedContacts");

// Variables
const router = express.Router();
const prisma = new PrismaClient();

// Routes
// test route
router.get("/test", (req, res) => {
    res.json({ msg: "test route for contact controller" });
});

// seed route
router.get("/seed", async (req, res) => {
    await prisma.contact.deleteMany();
    const contacts = await prisma.contact.createMany(
        { data: seedContacts }
    );
    res.status(201).json(contacts);
});

module.exports = router;