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

// Export
module.exports = router;