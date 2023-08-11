const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    benefits: {
      type: String,
      required: true,
    },
    requirements: {
      type: String,
      required: true,
    },
    applyForm: {
      type: mongoose.ObjectId,
      ref: "apply",
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("JobDetails", jobSchema);
