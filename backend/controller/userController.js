const userModel = require("../model/userModel");
const applyModel = require("../model/applyModel");
const jobModel = require("../model/jobModel");
const bcrpty = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exitingUser = await userModel.findOne({ email: email });
    if (exitingUser) {
      return res.status(404).send({ error: "User already registered " });
    }
    const hashpassword = await bcrpty.hash(password, 10);
    const newUser = await userModel.create({ email: email, password: hashpassword, name });
    const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24 * 7,
    });
    res.cookie("accessToken", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return res.status(200).send({ message: "User created", token: token, user: newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "user not created" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      const comparePassword = await bcrpty.compare(password, user.password);
      if (comparePassword) {
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24 * 7,
        });
        res.cookie("accessToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        return res.status(200).send({ token, message: "Login successful" });
      } else {
        return res.status(401).send({ error: "password mismatch" });
      }
    } else {
      return res.status(401).send({ error: "Email not found " });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Not login" });
  }
};

exports.logout = async (req, res, next) => {
  return res.status(200).send({ token: "" });
  // res.cookie("accessToken", null, {
  //   expires: new Date(Date.now()),
  //   httpOnly: true,
  // });
};

exports.getUser = async (req, res) => {
  const users = await userModel.find({});
  return res.status(200).send({ users, userCount: users.length });
};

exports.deleteUser = async (req, res) => {
  const deleteUser = await userModel.findByIdAndDelete(req.params.id);
  return res.status(204).send({ message: "User deleted" });
};

//single user
exports.userDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findOne({ _id: id }).select("-password");
    const userApply = await applyModel.find({ user: id });
    let alljobs = [];
    for (let i = 0; i < userApply.length; i++) {
      let alljob = await jobModel.find({ applyForm: userApply[i] });
      alljobs.push(alljob);
    }
    return res.status(200).json({ user: user, applyJobs: alljobs });
  } catch (error) {
    console.log(error);
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, contact, address, skill } = req.body;

  try {
    const user = await userModel.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details
    user.name = name || user.name;
    user.email = email || user.email;
    user.contact = contact || user.contact;
    user.address = address || user.address;
    user.skill = skill || user.skill;

    // Save the updated user
    await user.save();

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
