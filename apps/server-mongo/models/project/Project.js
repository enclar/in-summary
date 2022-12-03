const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        title:  { type: String, required: true },
        type: { type: String, required: true },
        client: { type: mongoose.Schema.Types.ObjectId, ref: "ExternalUser", required: true },
        date: { type: Date, required: true },
        location: { type: [Object], required: true },
        ic: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
        meetings: { type: [mongoose.Schema.Types.ObjectId], ref: "Meeting" },
        checkPoints: { type: [mongoose.Schema.Types.ObjectId], ref: "Checkpoint" },
        // inspiration: Image,
        // sketches: Image,
        vendors: { type: [mongoose.Schema.Types.ObjectId], ref: "ExternalUser" }
    },
    { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;