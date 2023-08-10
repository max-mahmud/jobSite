const { register, login, getUser, deleteUser, logout, userDetails, updateUser } = require("../controller/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/all-user", getUser);
router.delete("/user-delete/:id", deleteUser);

router.get("/user-details/:id", userDetails);
router.put("/user-update/:id", updateUser);

module.exports = router;
