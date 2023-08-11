const categoryModel = require("../model/categoryModel");

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(401).send({ error: "Name is required" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(401).send({
        success: true,
        error: "Category Already Exisits",
      });
    }
    const category = await categoryModel.create({ name });
    res.status(201).send({
      success: true,
      message: "New category created",
      category,
    });
  } catch (error) {
    res.status(500).send({
      error: "Errro in Category",
    });
  }
};

exports.getAllcategory = async (req, res) => {
  try {
    const category = await categoryModel.find({}).sort({ createdAt: -1 });
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

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category } = req.body;
    const update = await categoryModel.findById(id);
    if (!update) {
      return res.status(404).send({
        message: "Category not found",
      });
    }
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      {
        name: category,
      },
      { new: true }
    );

    res.status(200).send({
      message: "Category Updated Successfully",
      updatedCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: "Error while updating category",
    });
  }
};

//single category
exports.singleCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const singleCate = await categoryModel.findById(id);
    res.status(200).send({ singleCate });
  } catch (error) {
    res.status(500).send({
      error: "Error while getting category",
    });
  }
};
