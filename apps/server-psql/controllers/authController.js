// Dependancies
const express = require("express");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validation = require("../middleware/validation");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const saltRounds = 10;
const prisma = new PrismaClient();

// Routes
// register new staff
router.post("/register/staff", validation, async (req, res) => {
    try {
        const staffCheck = await prisma.staff.findUnique({
            where: { email: req.body.email }
        });

        if (userCheck) {
            res.status(401).json({ error: "This email is already linked to a staff account" });
        } else {
            const newStaff = await prisma.staff.create({
                data: {
                    ...req.body,
                    password: bcrypt.hashSync(req.body.password, saltRounds)
                }
            });

            const token = jwtGenerator(newStaff.id);
            res.status(201).json({ newStaff: newStaff, token: token });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// register new client
router.post("/register/client", validation, async (req, res) => {
    try {
        const clientCheck = await prisma.client.findUnique({
            where: { email: req.body.email }
        });

        if (clientCheck) {
            res.status(401).json({ error: "This email is already linked to a client account" });
        } else {
            const newClient = await prisma.client.create({
                data: {
                    ...req.body,
                    password: bcrypt.hashSync(req.body.password, saltRounds)
                }
            });

            const token = jwtGenerator(newClient.id);
            res.status(201).json({ newClient: newClient, token: token });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// register new vendor
router.post("/register/vendor", validation, async (req, res) => {
    try {
        const vendorCheck = await prisma.vendor.findUnique({
            where: { email: req.body.email }
        });

        if (vendorCheck) {
            res.status(401).json({ error: "This email is already linked to a vendor account" });
        } else {
            const newVendor = await prisma.vendor.create({
                data: {
                    ...req.body,
                    password: bcrypt.hashSync(req.body.password, saltRounds)
                }
            });

            const token = jwtGenerator(newVendor.id);
            res.status(201).json({ newStaff: newVendor, token: token });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// staff login
router.post("/login/staff", validation, async (req, res) => {
    try {
        const staff = await prisma.staff.findUnique({
            where: { email: req.body.email }
        });

        if (!staff) {
            res.status(401).json({ error: "No staff account associated with this email" });
        } else {
            const loginPass = bcrypt.compareSync(req.body.password, staff.password);

            if (loginPass) {
                const token = jwtGenerator(staff.id);
                res.status(200).json({ staff: staff, token: token });
            } else {
                res.status(401).json({ error: "Wrong password" });
            }
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// client login
router.post("/login/client", validation, async (req, res) => {
    try {
        const client = await prisma.client.findUnique({
            where: { email: req.body.email }
        });

        if (!client) {
            res.status(401).json({ error: "No client account associated with this email" });
        } else {
            const loginPass = bcrypt.compareSync(req.body.password, client.password);

            if (loginPass) {
                const token = jwtGenerator(client.id);
                res.status(200).json({ client: client, token: token });
            } else {
                res.status(401).json({ error: "Wrong password" });
            }
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// vendor login
router.post("/login/vendor", validation, async (req, res) => {
    try {
        const vendor = await prisma.vendor.findUnique({
            where: { email: req.body.email }
        });

        if (!vendor) {
            res.status(401).json({ error: "No vendor account associated with this email" });
        } else {
            const loginPass = bcrypt.compareSync(req.body.password, vendor.password);

            if (loginPass) {
                const token = jwtGenerator(vendor.id);
                res.status(200).json({ vendor: vendor, token: token });
            } else {
                res.status(401).json({ error: "Wrong password" });
            }
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Export
module.exports = router;