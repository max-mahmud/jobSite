const mongoose = require("mongoose");

const applySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.ObjectId,
    ref: "users",
    required: true,
  },
});

module.exports = mongoose.model("apply", applySchema);
