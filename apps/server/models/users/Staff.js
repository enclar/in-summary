const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        contact: { type: String, required: true },
        admin: { type: Boolean, default: false },
        accountType: { type: String, default: "staff" }
    },
    { timestamps: true }
);

const Staff = mongoose.model("Staff", staffSchema);
module.exports = Staff;