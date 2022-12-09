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
                client: true
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

// add new project
router.post("/new", authorization, async (req, res) => {
    try {
        const project = await prisma.project.create({
            data: req.body
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

module.exports = router;