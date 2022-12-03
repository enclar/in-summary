// Dependancies
const express = require("express");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const seedStaff = require("../seed-data/seedStaff");

// Variables
const router = express.Router();
const prisma = new PrismaClient();
const saltRounds = 10;

const encryptedStaff = seedStaff.map((staff) => (
    {
        ...staff,
        password: bcrypt.hashSync(staff.password, saltRounds)
    }
));

// Routes
// test route
router.get("/test", (req, res) => {
    res.json({ msg: "psql user controller test route" })
});

// seed route
router.get("/seed", async (req, res) => {
    await prisma.staff.deleteMany();
    const staff = await prisma.staff.createMany({
        data: encryptedStaff
    });
    res.status(201).json(staff);
});

// get all users
router.get("/get-all", async (req, res) => {
    try {
        const allStaff = await prisma.staff.findMany();
        res.json(allStaff);
    } catch (error) {
        res.json(error);
    }
});

// login route
router.post("/login", async (req, res) => {
    try {
        const staff = await prisma.staff.findUnique({
            where: {
                email: req.body.email,
            }
        });
        
        if (!staff) {
            res.status(400).json({ error: "No account associated with this email" });
        } else {
            const loginPass = bcrypt.compareSync(req.body.password, staff.password);
    
            if (loginPass) {
                res.status(200).json(staff);
            } else {
                res.status(400).json({ error: "Wrong password"});
            }
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Export
module.exports = router;