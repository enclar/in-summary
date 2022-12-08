// Dependancies
const express = require("express");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

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

// login route
router.post("/login", async (req, res) => {
    try {
        const client = await prisma.client.findUnique({
            where: { email: req.body.email }
        });

        if (!client) {
            res.status(400).json({ error: "No client account associated with this email" });
        } else {
            const loginPass = bcrypt.compareSync(req.body.password, client.password);

            if (loginPass) {
                res.status(200).json(client);
            } else {
                res.status(400).json({ error: "Wrong password" });
            }
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;