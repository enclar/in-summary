const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        access: { type: Number, required: true },
    },
    { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;