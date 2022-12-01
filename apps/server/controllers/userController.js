// Dependancies
const express = require("express");
const bcrypt = require("bcrypt");

const Staff = require("../models/users/Staff");
const ExternalUser = require("../models/users/ExternalUser");

const seedStaff = require("../seed-data/seedStaff");
const seedExternalUser = require("../seed-data/seedExternalUser");

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
    
    // encrypting seedStaff passwords
    const encryptedStaff = seedStaff.map((staff) => (
        {
            ...staff,
            password: bcrypt.hashSync(staff.password, saltRounds)
        }
    ));

    // inserting seedStaff data
    const staff = await Staff.insertMany(encryptedStaff);

    // encrypting seedExternalUser passwords
    const encryptedExternalUsers = seedExternalUser.map((user) => (
        {
            ...user,
            password: bcrypt.hashSync(user.password, saltRounds)
        }
    ));

    // inserting seedExternalUser data
    const externalUsers = await ExternalUser.insertMany(encryptedExternalUsers);

    res.status(201).json({ staff: staff, externalUsers: externalUsers });
});

// login route
router.post("/login", async (req, res) => {
    try {
        const staff = await Staff.findOne({ email: req.body.email }).exec();
        const externalUser = await ExternalUser.findOne({ email: req.body.email }).exec();

        if (!staff && !externalUser) {
            res.status(400).json({ error: "No account associated with this email" });

        } else if (!externalUser && staff.length !== 0) {
            const loginPass = bcrypt.compareSync(req.body.password, staff.password);
            if (loginPass) {
                res.status(200).json(staff);
            } else {
                res.status(400).json({ error: "Wrong password" });
            }

        } else if (!staff && externalUser.length !== 0) {
            const loginPass = bcrypt.compareSync(req.body.password, externalUser.password);
            if (loginPass) {
                res.status(200).json(externalUser);
            } else {
                res.status(400).json({ error: "Wrong password" });
            }
        }

    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Export
module.exports = router;