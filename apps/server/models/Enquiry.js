const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        contactNumber: { type: String, required: true },
        eventDate: { type: Date, required: true },
        description: { type: String, required: true },
        followUp: { type: String, default: false }
    },
    { timestamps: true }
);

const Enquiry = mongoose.model("Enquiry", enquirySchema);
module.exports = Enquiry;