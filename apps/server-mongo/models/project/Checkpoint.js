const mongoose = require("mongoose");

const checkpointSchema = new mongoose.Schema(
    {
        project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
        title: { type: String, required: true },
        description: { type: String },
        dueBy: { type: Date, required: true },
        complete: { type: Boolean, default: false }
    },
    { timestamps: true }
);

const Checkpoint = mongoose.model("Checkpoint", checkpointSchema);
module.exports = Checkpoint;