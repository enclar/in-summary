// Dependancies
const router = require("express").Router();
const authorization = require("../middleware/authorization");

// Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Routes
// test route
router.get("/test", (req, res) => {
    res.json({ msg: "test route for checkpoint controller" });
});

// get all checkpoints for a project
router.get("/:project", authorization, async (req, res) => {
    try {
        const checkpoints = await prisma.checkpoint.findMany({
            where: { projectId: req.params.project },
            orderBy: { date: "asc" }
        });

        if (!checkpoints) {
            res.status(401).json({ error: "No checkpoints available for this project" });
        } else {
            res.status(200).json(checkpoints);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// add new checkpoint
router.post("/new", authorization, async (req, res) => {
    try {
        const checkpoint = await prisma.checkpoint.create({
            data: req.body
        });

        if (!checkpoint) {
            res.status(401).json({ error: "Unable to add new checkpoint" });
        } else {
            res.status(201).json(checkpoint);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// delete a checkpoint
router.delete("/delete/:id", authorization, async (req, res) => {
    try {
        const deleteCheckpoint = await prisma.checkpoint.delete({
            where: { id: req.params.id }
        });

        if (!deleteCheckpoint) {
            res.status(401).json({ error: "Unable to delete checkpoint "});
        } else {
            res.status(200).json(deleteCheckpoint);
        }
    } catch (error) {
        res.status(500).json({})
    }
});

module.exports = router;