// Dependancies
const express = require("express");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const seedStaff = require("../seed-data/seedStaff");
const seedExternalUsers = require("../seed-data/seedExternalUsers")

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

const encryptedExternalUsers = seedExternalUsers.map((user) => (
    {
        ...user,
        password: bcrypt.hashSync(user.password, saltRounds)
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
    await prisma.externalUsers.deleteMany();

    const staff = await prisma.staff.createMany({
        data: encryptedStaff
    });

    const externalUsers = await prisma.externalUsers.createMany({
        data: encryptedExternalUsers,
    });

    res.status(201).json({ staff: staff, externalUsers: externalUsers });
});

// get all staff
router.get("/all-staff", async (req, res) => {
    try {
        const allStaff = await prisma.staff.findMany();
        res.json(allStaff);
    } catch (error) {
        res.json(error);
    }
});

// get all external users
router.get("/all-ext", async (req, res) => {
    try {
        const allExtUsers = await prisma.externalUsers.findMany();
        res.json(allExtUsers);
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

// create new user
router.post("/new", async (req, res) => {
    console.log("req body:", req.body);

    try {
        if (req.body.accountType === "staff") {
            const staffCheck = await prisma.staff.findUnique({
                where: { email: req.body.email }
            });

            if (!staffCheck) {
                const newStaff = await prisma.staff.create({
                    data: {
                        ...req.body,
                        password: bcrypt.hashSync(req.body.password, saltRounds)
                    }
                });

                res.status(201).json(newStaff);
            } else {
                res.status(400).json({ error: "An account is already associated with this email"});
            }
        } else if (req.body.accountType === "client" || req.body.accountType === "vendor") {
            const extUserCheck = await prisma.externalUsers.findUnique({
                where: { email: req.body.email }
            });

            if (!extUserCheck) {
                const newExtUser = await prisma.externalUsers.create({
                    data: {
                        ...req.body,
                        password: bcrypt.hashSync(req.body.password, saltRounds)
                    }
                });

                res.status(201).json(newExtUser);
            } else {
                res.status(400).json({ error: "An account is already associated with this email" });
            }
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Export
module.exports = router;