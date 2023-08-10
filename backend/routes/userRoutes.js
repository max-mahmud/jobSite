const { register, login, getUser, deleteUser, logout } = require("../controller/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/all-user", getUser);
router.delete("/user-delete/:id", deleteUser);

module.exports = router;
