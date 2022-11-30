// Dependancies
const express = require("express");
const Staff = require("../models/Staff");
const router = express.Router();

// Routes
// test route
router.get("/test", (req, res) => {
    res.json({ msg: "test route for account controller"})
});

// seed route
router.get("/seed", async (req, res) => {
    await Account.deleteMany();
});

// Export
module.exports = router;