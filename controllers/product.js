import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";

export const createProduct = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(404).send({ message: "Name is Required" });
      case !description:
        return res.status(404).send({ message: "Description is Required" });
      case !price:
        return res.status(404).send({ message: "Price is Required" });
      case !category:
        return res.status(404).send({ message: "Category is Required" });
      case !quantity:
        return res.status(404).send({ message: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(404)
          .send({ message: "Photo is Required should me less then 1mb" });
    }
    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Somthing went wrong",
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(404).send({ message: "Name is Required" });
      case !description:
        return res.status(404).send({ message: "Description is Required" });
      case !price:
        return res.status(404).send({ message: "Price is Required" });
      case !category:
        return res.status(404).send({ message: "Category is Required" });
      case !quantity:
        return res.status(404).send({ message: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(404)
          .send({ message: "Photo is Required should me less then 1mb" });
    }
    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Somthing went wrong",
      error: error.message,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All Products",
      Total_Products_Count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Somthing went wrong",
      error: error.message,
    });
  }
};

export const getSingleProducts = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Somthing went wrong",
      error: error.message,
    });
  }
};

export const getProductPhoto = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      res.status(200).send(product.photo.data);
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Somthing went wrong",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res
      .status(200)
      .send({ success: true, message: "product Deleted Successfully" });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Somthing went wrong",
      error: error.message,
    });
  }
};
