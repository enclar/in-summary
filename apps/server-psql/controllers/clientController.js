// Dependancies
const router = require("express").Router();
const authorization = require("../middleware/authorization");

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

module.exports = router;