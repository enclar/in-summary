// Dependancies
const express = require("express");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const seedContacts = require("../seed-data/seedContacts");
const seedAccounts = require("../seed-data/seedAccounts");

// Variables
const router = express.Router();
const prisma = new PrismaClient();
const saltRounds = 10;

// Account Encryption
const encryptedAccounts = seedAccounts.map((account) => (
    {
        ...account,
        password: bcrypt.hashSync(account.password, saltRounds)
    }
));

// Routes
// test route
router.get("/test", (req, res) => {
    res.json({ msg: "psql user controller test route" })
});

// seed contacts
router.get("/seed-contacts", async (req, res) => {
    await prisma.contacts.deleteMany();
    const contacts = await prisma.contacts.createMany(
        { data: seedContacts }
    );
    res.status(201).json(contacts);
});

// seed phonebook
router.get("/seed-pb", async (req, res) => {
    await prisma.phonebook.deleteMany();

    const contacts = await prisma.phonebook.createMany({
        data: seedPhonebook
    });

    res.status(201).json(contacts);
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