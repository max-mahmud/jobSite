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
    // jobImage : {
    //     type: String,
    //     required: true,
    // },
  },
  { timestamps: true }
);

jobSchema.index({
  title: "text",
});

module.exports = mongoose.model("JobDetails", jobSchema);
