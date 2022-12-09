// Dependancies
const router = require("express").Router();
const authorization = require("../middleware/authorization");

// Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Routes
// test route
router.get("/test", (req, res) => {
    res.json({ msg: "test route for contact controller" });
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