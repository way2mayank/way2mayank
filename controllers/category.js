import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

// CREATE CATEGORY
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(401).send({ message: "Name is required" });

    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory)
      return res
        .status(401)
        .send({ success: true, message: "Category already exists" });
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res
      .status(201)
      .send({ success: true, message: "new category created", category });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Somthing went wrong",
      error: error.message,
    });
  }
};

// UPDATE CATEGORY
export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res
      .status(200)
      .send({
        success: true,
        message: "category updated successfully",
        category,
      });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Somthing went wrong",
      error: error.message,
    });
  }
};

// GET ALL CATEGORY
export const getAllCategory = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All category ",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Somthing went wrong",
      error: error.message,
    });
  }
};

// GET CATEGORY BY slug
export const getCategoryById = async (req, res) => {
  try {
    const category = await categoryModel.findOne({slug:req.params.slug});
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category found",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Somthing went wrong",
      error: error.message,
    });
  }
};


// DELETE CATEGORY
export const deleteCategory = async (req, res)=>{
    try {
       const category = await categoryModel.findByIdAndDelete({_id:req.params.id})
       if(!category) return res.status(404).send({status:true, message:"category not found"})
        res.status(200).send({success:true, message:"Category Delated Successfully"})
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Somthing went wrong",
            error: error.message,
          });
    }
}