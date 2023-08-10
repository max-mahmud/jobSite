const msgModel = require("../model/messaeModel");

exports.createMsg = async (req, res, next) => {
  const { name, email, message, userId } = req.body;
  console.log(req.body);
  try {
    const newMsg = await msgModel.create({ name: name, email: email, message: message, user: userId });
    return res.status(200).json({ message: "success message", newMsg: newMsg });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteMsg = async (req, res, next) => {
  const { id } = req.params;
  try {
    await msgModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "message deleted" });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getAllMsg = async (req, res, next) => {
  try {
    const allMsg = await msgModel.find({}).limit(12).sort({ createdAt: -1 }).populate("user");
    return res.status(200).json({ mesages: allMsg });
  } catch (error) {
    console.log(error.message);
  }
};
