// Dependancies
const express = require("express");
const Account = require("../models/Account");
const router = express.Router();

// Routes
// test route
router.get("/test", (req, res) => {
    res.json({ msg: "test route for account controller"})
});

// Export
module.exports = router;