// Dependancies
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const authorization = require("../middleware/authorization");

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

// get all contacts
router.get("/all", authorization, async (req, res) => {
    try {
        const contacts = await prisma.contact.findMany();

        if (!contacts) {
            res.status(400).json({ error: "No contacts found" });
        } else {
            res.status(200).json(contacts);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
})

module.exports = router;