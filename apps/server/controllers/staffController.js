// Dependancies
const express = require("express");
const bcrypt = require("bcrypt");

const Staff = require("../models/Staff");
const seedStaff = require("../seed-data/seedStaff");

// Variables
const router = express.Router();
const saltRounds = 10;

// Routes
// test route
router.get("/test", (req, res) => {
    res.json({ msg: "test route for staff controller"})
});

// seed route
router.get("/seed", async (req, res) => {
    await Staff.deleteMany();
    
    const encryptedUsers = seedStaff.map((staff) => (
        {
            ...staff,
            password: bcrypt.hashSync(staff.password, saltRounds)
        }
    ));

    const staff = await Staff.insertMany(encryptedUsers);

    res.status(201).json(staff);
});

// login route
router.post("/login", async (req, res) => {
    try {
        const staff = await Staff.findOne({ email: req.body.email }).exec();
        if (Object.keys(staff).length === 0) {
            res.status(400).json({ error: "No account associated with this email" });
        } else {
            const loginPass = bcrypt.compareSync(req.body.password, staff.password);
            if (loginPass) {
                res.status(200).json(staff);
            } else {
                res.status(400).json({ error: "Wrong password" });
            }
        }
    } catch (error) {
        res.status(500).json({ error: "No account associated with this email" });
    }
});

// Export
module.exports = router;