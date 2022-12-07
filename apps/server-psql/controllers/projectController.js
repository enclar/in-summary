// Dependancies
const express = require("express");
const { PrismaClient } = require("@prisma/client");

const seedProjects = require("../seed-data/seedProjects");

// Variables
const router = express.Router();
const prisma = new PrismaClient();

// Routes
// test route
router.get("/test", (req, res) => {
    res.json({ msg: "test route for project controller" });
});

// seed route
router.get("/seed", async (req, res) => {
    await prisma.project.deleteMany();
    const projects = await prisma.project.createMany(
        { data: seedProjects }
    );
    res.status(201).json(projects);
});

module.exports = router;