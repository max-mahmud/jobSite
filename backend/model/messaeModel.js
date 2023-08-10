const mongoose = require("mongoose");

const messsageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    user: { type: mongoose.ObjectId, ref: "users", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("messsage", messsageSchema);
