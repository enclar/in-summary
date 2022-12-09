// Dependancies
const router = require("express").Router();
const authorization = require("../middleware/authorization");

// Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Routes
// test route
router.get("/test", (req, res) => {
    res.json({ msg: "test route for task controller" });
});

// get all tasks for a project
router.get("/:project", authorization, async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({
            where: { projectId: req.params.project }
        });

        if (!tasks) {
            res.status(401).json({ error: "No tasks found for this project" });
        } else {
            res.status(200).json(tasks);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});


module.exports = router;