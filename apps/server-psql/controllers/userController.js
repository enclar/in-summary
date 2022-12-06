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

// seed accounts
router.get("/seed-accounts", async (req, res) => {
    await prisma.accounts.deleteMany();
    const accounts = await prisma.accounts.createMany(
        { data: encryptedAccounts }
    );
    res.status(201).json(accounts);
});

// login route
router.post("/login", async (req, res) => {
    try {
        const user = await prisma.accounts.findUnique({
            where: { email: req.body.email }
        });
        if (!user) {
            res.status(400).json({ error: "No account associated with this email" });
        } else {
            const loginPass = bcrypt.compareSync(req.body.password, user.password);
            if (loginPass) {
                res.status(200).json(user);
            } else {
                res.status(400).json({ error: "Wrong password" });
            }
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// create new contact
router.post("/new-contact", async (req, res) => {
    console.log("req body:", req.body);

    try {
        const checkContact = await prisma.contacts.findUnique({
            where: { contact_number: req.body.contact_number }
        });

        if (!checkContact) {
            const newContact = await prisma.contacts.create({
                data: req.body
            });

            res.status(201).json(newContact);
        } else {
            res.status(400).json({ error: "This number is already linked to an existing contact" });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// create new account
router.post("/new-account", async (req, res) => {
    console.log("req body:", req.body);

    try {
        const checkAccount = await prisma.accounts.findUnique({
            where: { email: req.body.email }
        });

        if (!checkAccount) {
            const newAccount = await prisma.accounts.create({
                data: {
                    ...req.body,
                    password: bcrypt.hashSync(req.body.password, saltRounds)
                }
            });
            
            res.status(200).json(newAccount);
        } else {
            res.status(400).json({ error: "This email is already linked to an existing account" });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
})

// Export
module.exports = router;