const msgModel = require("../model/messaeModel");

exports.createMsg = async (req, res) => {
  const { name, email, message, userId } = req.body;
  try {
    const newMsg = await msgModel.create({ name: name, email: email, message: message, user: userId });
    return res.status(200).json({ message: "Message send SuccessFully", newMsg: newMsg });
  } catch (error) {
    return res.status(500).json({ error: "Message Create Failed" });
  }
};

exports.deleteMsg = async (req, res) => {
  const { id } = req.params;
  try {
    await msgModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Message deleted" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Message Delete Failed" });
  }
};

exports.getAllMsg = async (req, res) => {
  try {
    const allMsg = await msgModel.find({}).limit(16).sort({ createdAt: -1 }).populate("user");
    return res.status(200).json({ allMsg });
  } catch (error) {
    console.log(error.message);
  }
};
