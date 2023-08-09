const {
  createCategory,
  getAllcategory,
  deleteCategory,
  updateCategory,
  singleCategory,
} = require("../controller/categoryController");

const router = require("express").Router();

router.post("/create-category", createCategory);
router.get("/all-category", getAllcategory);
router.delete("/category/delete/:id", deleteCategory);
router.put("/category/update/:id", updateCategory);
router.get("/category/:id", singleCategory);

module.exports = router;
