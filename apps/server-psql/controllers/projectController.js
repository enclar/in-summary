// Dependancies
const router = require("express").Router();
const authorization = require("../middleware/authorization");

// Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Routes
// test route
router.get("/test", (req, res) => {
    res.json({ msg: "test route for project controller" });
});

// get all projects
router.get("/all", authorization, async (req, res) => {
    try {
        const projects = await prisma.project.findMany({
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
            },
            orderBy: {
                startDate: "asc",
            }
        });

        if (!projects) {
            res.status(400).json({ error: "No projects found"});
        } else {
            res.status(200).json(projects);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// get all projects for a client
router.get("/client-all/:id", authorization, async (req, res) => {
    try {
        const clientProjects = await prisma.project.findMany({
            where: { clientId: req.params.id },
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
            },
            orderBy: {
                startDate: "asc",
            }
        });

        if (!clientProjects) {
            res.status(401).json({ error: "No projects found for this user" });
        } else {
            res.status(200).json(clientProjects);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// add new project
router.post("/new", authorization, async (req, res) => {
    try {
        const project = await prisma.project.create({
            data: req.body,
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
        });

        if (!project) {
            res.status(401).json({ error: "Unable to create new project" });
        } else {
            res.status(201).json(project);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// edit an existing project
router.put("/update/:id", authorization, async (req, res) => {
    try {
        const updatedProject = await prisma.project.update({
            where: req.params,
            data: req.body,
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
        });

        if (!updatedProject) {
            res.status(401).json({ error: "Unable to update project" });
        } else {
            res.status(200).json(updatedProject);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;