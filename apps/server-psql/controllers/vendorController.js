// Dependancies
const router = require("express").Router();
const authorization = require("../middleware/authorization");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Routes
// test route
router.get("/test", (req, res) => {
    res.json({ msg: "test route for vendor controller" });
});



module.exports = router;