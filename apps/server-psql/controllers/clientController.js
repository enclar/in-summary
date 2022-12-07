// Dependancies
const express = require("express");
const { PrismaClient } = require("@prisma/client");

const seedClients = require("../seed-data/seedClients");

// Variables
const router = express.Router();
const prisma = new PrismaClient();

// Routes
// test route
router.get("/test", (req, res) => {
    res.json({ msg: "test route for client controller" });
});

// seed route
router.get("/seed", async (req, res) => {
    await prisma.client.deleteMany();
    const clients = await prisma.client.createMany(
        { data: seedClients }
    );
    res.status(201).json(clients);
});

module.exports = router;