const { createCategory, getAllcategory, deleteCategory } = require("../controller/categoryController");

const router = require("express").Router();

router.post("/create-category", createCategory);
router.get("/all-category", getAllcategory);
router.delete("/category/:id", deleteCategory);

module.exports = router;
