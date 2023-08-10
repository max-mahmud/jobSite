const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    contact: {
      type: String,
      default: "no contact",
    },
    address: {
      type: String,
      default: "no address",
    },
    skill: {
      type: String,
      default: "no skill",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
