// Dependancies
const express = require("express");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const authorization = require("../middleware/authorization");

const seedClients = require("../seed-data/seedClients");

// Variables
const router = express.Router();
const saltRounds = 10;
const prisma = new PrismaClient();

// Encryption
const encryptedClients = seedClients.map((client) => (
    {
        ...client,
        password: bcrypt.hashSync(client.password, saltRounds)
    }
));

// Routes
// test route
router.get("/test", (req, res) => {
    res.json({ msg: "test route for client controller" });
});

// seed route
router.get("/seed", async (req, res) => {
    await prisma.client.deleteMany();
    const clients = await prisma.client.createMany(
        { data: encryptedClients }
    );
    res.status(201).json(clients);
});

// get all clients
router.get("/all", authorization, async (req, res) => {
    try {
        const clients = await prisma.client.findMany();

        if (!clients) {
            res.status(400).json({ error: "No clients found" });
        } else {
            res.status(200).json(clients);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;