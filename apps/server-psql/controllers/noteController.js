// Dependancies
const router = require("express").Router();
const authorization = require("../middleware/authorization");

// Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Routes
// test route
router.get("/test", (req, res) => {
    res.json({ msg: "test route for note controller"});
});

// add a new note
router.post("/new", authorization, async (req, res) => {
    try {
        const note = await prisma.note.create({
            data: req.body
        });

        if (!note) {
            res.status(401).json({ error: "Unable to create new note"});
        } else {
            res.status(201).json(note);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;