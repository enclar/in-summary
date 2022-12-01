const mongoose = require("mongoose");

const externalUserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        company: { type: Boolean, required: true },
        details: { type: [Object], required: true },
        admin: { type: Boolean, default: false },
        accountType: { type: String, required: true }
    },
    { timestamps: true }
);

const ExternalUser = mongoose.model("ExternalUser", externalUserSchema);
module.exports = ExternalUser;