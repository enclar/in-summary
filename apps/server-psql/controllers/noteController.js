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

// edit an existing note
router.put("/edit/:note", authorization, async (req, res) => {
    try {
        const updatedNote = await prisma.note.update({
            where: { id: req.params.note },
            data: { content: req.body.content }
        });

        if (!updatedNote) {
            res.status(401).json({ error: "Unable to edit note" });
        } else {
            res.status(200).json(updatedNote);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// delete an existing note
router.delete("/delete/:note", authorization, async (req, res) => {
    try {
        const deletedNote = await prisma.note.delete({
            where: { id: req.params.note }
        });

        if (!deletedNote) {
            res.status(401).json({ error: "Unable to delete note" })
        } else {
            res.status(200).json(deletedNote);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
})

module.exports = router;