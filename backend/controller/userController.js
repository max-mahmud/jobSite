const userModel = require("../model/userModel");
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
