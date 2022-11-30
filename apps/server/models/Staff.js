const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        access: { type: Number, required: true },
        type: { type: String, required: true }
    },
    { timestamps: true }
);

const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;