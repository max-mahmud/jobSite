const { createMsg, deleteMsg, getAllMsg } = require("../controller/messageController");

const router = require("express").Router();

router.post("/create-msg", createMsg);
router.delete("/delete-msg/:id", deleteMsg);
router.get("/all-msgs", getAllMsg);

module.exports = router;
