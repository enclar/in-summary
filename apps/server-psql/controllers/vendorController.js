// Dependancies
const router = require("express").Router();
const bcrypt = require("bcrypt");
const authorization = require("../middleware/authorization");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Routes
// test route
router.get("/test", (req, res) => {
    res.json({ msg: "test route for vendor controller" });
});

// add new vendor
router.post("/new", authorization, async (req, res) => {
    const { vendor, contact } = req.body;
    try {
        const newVendor = await prisma.vendor.create({
            data: {
                name: vendor.name,
                email: vendor.email,
                password: bcrypt.hashSync(vendor.password, 10),
                employees: { create: [contact] }
            }
        });

        if (!newVendor) {
            res.status(401).json({ error: "Unable to add new vendor account"})
        } else {
            res.status(201).json(newVendor);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
})

module.exports = router;