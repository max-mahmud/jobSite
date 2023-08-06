const categoryModel = require("../model/categoryModel");

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        error: "Category Already Exisits",
      });
    }
    const category = await categoryModel.create({ name });
    res.status(201).send({
      success: true,
      message: "new category created",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: "Errro in Category",
    });
  }
};

exports.getAllcategory = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).json({
      count: category.length,
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: "Error while getting all categories",
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      message: "Categry Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: "error while deleting category",
    });
  }
};
