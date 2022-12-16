// Dependancies
const router = require("express").Router();
const authorization = require("../middleware/authorization");
const bcrypt = require("bcrypt");

// Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Routes
// test route
router.get("/test", (req, res) => {
    res.json({ msg: "test route for staff controller" });
});

// get all staff
router.get("/all", authorization, async (req, res) => {
    try {
        const staff = await prisma.staff.findMany();
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// create a new staff account
router.post("/new", authorization, async (req, res) => {
    try {
        const staff = await prisma.staff.create({
            data: {
                ...req.body,
                password: bcrypt.hashSync(req.body.password, 10)
            }
        });

        if (!staff) {
            res.status(401).json({ error: "Unable to add new staff account" });
        } else {
            res.status(201).json(staff);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// update an existing staff account
router.put("/update/:id", authorization, async (req, res) => {
    try {
        const checkEmail = await prisma.staff.findUnique({
            where: { email: req.body.email }
        });

        if (checkEmail[0].id !== req.params.id) {
            return res.status(401).json({ error: "This email is already linked to another account" });
        }

        const checkContact = await prisma.staff.findUnique({
            where: { contactNum: req.body.contactNum }
        });

        if (checkContact[0].id !== req.params.id) {
            return res.status(401).json({ error: "This number is already linked to another account" });
        }

        const updatedStaff = await prisma.staff.update({
            where: req.params,
            data: req.body
        });

        if (!updatedStaff) {
            res.status(401).json({ error: "Unable to update user information"});
        } else {
            res.status(200).json(updatedStaff);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;