const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "please provide company name for job"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "please provide position name for job"],
      maxlength: 50,
    },
    status: {
      type: String,
      required: [true, "please provide position name for job"],
      enum: ["interview", "pending", "declined"],
      default: "pending",
      maxlength: 50,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
