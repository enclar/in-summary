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

// update a specific note in a project
// router.put("/edit/:id", authorization, async (req, res) => {
//     try {
//         const updatedNote = prisma.project.update({
//             where: { id: req.params.id },
//             data: {
//                 notes: {
//                     update: {
//                         where: { id: req.body.id },
//                         data: { content: req.body.content }
//                     }
//                 }
//             },
//             // include: {
//             //     inCharge: true,
//             //     client: true,
//             //     checkpoints: {
//             //         orderBy: { date: "asc" }
//             //     },
//             //     vendors: true,
//             //     notes: true,
//             //     meetings: true,
//             //     tasks: {
//             //         orderBy: { dueBy: "asc" }
//             //     } 
//             // }
//         });

//         if (!updatedNote) {
//             res.status(401).json({ error: "Unable to update note" });
//         } else {
//             res.status(200).json({ updated: updatedNote });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error });
//     }
// });

module.exports = router;