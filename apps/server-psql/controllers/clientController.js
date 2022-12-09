// Dependancies
const router = require("express").Router();
const authorization = require("../middleware/authorization");
const bcrypt = require("bcrypt");

// Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Routes
// test route
router.get("/test", (req, res) => {
    res.json({ msg: "test route for client controller" });
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

// add a new client
router.post("/new", authorization, async (req, res) => {
    const { client, contact } = req.body;
    try {
        const newClient = await prisma.client.create({
            data: {
                name: client.name,
                email: client.email,
                password: bcrypt.hashSync(client.password, 10),
                isCompany: client.isCompany,
                contacts: { create: [contact] }
            }
        });

        if (!client) {
            res.status(401).json({ error: "Unable to add new client account" });
        } else {
            res.status(201).json(newClient);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;