const { register, login, getUser, deleteUser } = require("../controller/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", getUser);
router.delete("/user-delete/:id", deleteUser);

module.exports = router;
