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
            where: { projectId: req.params.project },
            orderBy: { dueBy: "asc" }
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

// add a new task to a project
router.post("/new", authorization, async (req, res) => {
    try {
        const task = await prisma.task.create({
            data: req.body,
            include: {
                project: {
                    include: {
                        inCharge: true,
                        client: true,
                        checkpoints: {
                            orderBy: { date: "asc" }
                        },
                        vendors: true,
                        notes: true,
                        meetings: true,
                        tasks: {
                            orderBy: { dueBy: "asc" }
                        },
                        albums: {
                            include: { images: true }
                        }
                    }
                }
            }
        });

        if (!task) {
            res.status(401).json({ error: "Unable to add new task" });
        } else {
            res.status(201).json(task);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// update an existing task
router.put("/update/:id", authorization, async (req, res) => {
    try {
        const updatedTask = await prisma.task.update({
            where: req.params,
            data: req.body,
            include: {
                project: {
                    include: {
                        inCharge: true,
                        client: true,
                        checkpoints: {
                            orderBy: { date: "asc" }
                        },
                        vendors: true,
                        notes: true,
                        meetings: true,
                        tasks: {
                            orderBy: { dueBy: "asc" }
                        },
                        albums: {
                            include: { images: true }
                        }
                    }
                }
            }
        });

        if (!updatedTask) {
            res.status(401).json({ error: "Unable to update task" });
        } else {
            res.status(200).json(updatedTask);
        }
    } catch (error) {
        res.status(501).json({ error: error });
    }
});

// complete an existing task
router.put("/complete/:id", authorization, async (req, res) => {
    try {
        const completedTask = await prisma.task.update({
            where: req.params,
            data: req.body,
            include: {
                project: {
                    include: {
                        inCharge: true,
                        client: true,
                        checkpoints: {
                            orderBy: { date: "asc" }
                        },
                        vendors: true,
                        notes: true,
                        meetings: true,
                        tasks: {
                            orderBy: { dueBy: "asc" }
                        },
                        albums: {
                            include: { images: true }
                        }
                    }
                }
            }
        });

        if (!completedTask) {
            res.status(401).json({ error: "Unable to complete task"});
        } else {
            res.status(200).json(completedTask);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// delete an existing task
router.delete("/delete/:id", authorization, async (req, res) => {
    try {
        const deletedTask = await prisma.task.delete({
            where: req.params,
        });

        if (!deletedTask) {
            res.status(401).json({ error: "Unable to delete task" });
        } else {
            res.status(200).json(deletedTask);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
})

module.exports = router;