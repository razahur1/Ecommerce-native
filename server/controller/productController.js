import productModel from "../models/productModel.js";
import cloudinary from "cloudinary";
import { getDataUri } from "../utils/features.js";

//GET ALL PRODUCT
export const getAllProductsController = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).send({
      success: true,
      message: "all products fetched successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get All Products API",
      error,
    });
  }
};

//GET SINGLE PRODUCT
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    //validation
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product Not Found",
        error,
      });
    }
    res.status(200).send({
      success: true,
      message: "Product Found",
      product,
    });
  } catch (error) {
    console.log(error);
    //Cast error || Object ID
    if (error.name === "CastError") {
      res.status(500).send({
        success: false,
        message: "Invalid ID",
        error,
      });
    }
    res.status(500).send({
      success: false,
      message: "Error In Get Single Products API",
      error,
    });
  }
};

//CREATE PRODUCT
export const createProuctController = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    if (!name || !description || !price || !stock) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all Feilds",
      });
    }
    if (!req.file) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Product images",
      });
    }
    const file = getDataUri(req.file);
    const cdb = await cloudinary.v2.uploader.upload(file.content);
    const image = {
      public_id: cdb.public_id,
      url: cdb.secure_url,
    };

    await productModel.create({
      nmae,
      description,
      price,
      category,
      stock,
      images: [image],
    });
    res.status(201).send({
      success: false,
      message: "Product Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Product API",
      error,
    });
  }
};

// UPDATE PRODUCT
export const updateProductController = async (req, res) => {
  try {
    // find product
    const product = await productModel.findById(req.params.id);
    //valdiatiuon
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
    const { name, description, price, stock, category } = req.body;
    // validate and update
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (category) product.category = category;

    await product.save();
    res.status(200).send({
      success: true,
      message: "product details updated",
    });
  } catch (error) {
    console.log(error);
    // cast error ||  OBJECT ID
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error In UPDATE Products API",
      error,
    });
  }
};

// UPDATE PRODUCT IMAGE
export const updateProductImageController = async (req, res) => {
  try {
    // find product
    const product = await productModel.findById(req.params.id);
    // valdiation
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
    // check file
    if (!req.file) {
      return res.status(404).send({
        success: false,
        message: "Product image not found",
      });
    }

    const file = getDataUri(req.file);
    const cdb = await cloudinary.v2.uploader.upload(file.content);
    const image = {
      public_id: cdb.public_id,
      url: cdb.secure_url,
    };
    // save
    product.images.push(image);
    await product.save();
    res.status(200).send({
      success: true,
      message: "product image updated",
    });
  } catch (error) {
    console.log(error);
    // cast error ||  OBJECT ID
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error In UPDATE Products image API",
      error,
    });
  }
};

// DELETE Products Image
export const deleteProductImageController = async (req, res) => {
  try {
    // find product
    const product = await productModel.findById(req.params.id);
    // validation
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    // image id find
    const id = req.query.id;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Product image not found",
      });
    }

    let isExist = -1;
    product.images.forEach((item, index) => {
      if (item._id.toString() === id.toString()) isExist = index;
    });
    if (isExist < 0) {
      return res.status(404).send({
        success: false,
        message: "Image Not Found",
      });
    }

    //DELETE PRODUCT IMAGE
    await cloudinary.v2.uploader.destroy(product.images[isExist].public_id);
    product.images.splice(isExist, 1);
    product.save();
    return res.status(200).send({
      success: true,
      message: "Product Image Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    // cast error ||  OBJECT ID
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error In DELETE Products image API",
      error,
    });
  }
};

//DELETE PRODUCT
export const deleteProductController = async (req, res) => {
  try {
    // find product
    const product = await productModel.findById(req.params.id);
    // validation
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    //find and delete image cloudinary
    for (let index = 0; index < product.images.length; index++) {
      await cloudinary.v2.uploader.destroy(product.images[index].public_id);
    }
    await product.deleteOne();
    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    // cast error ||  OBJECT ID
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error In DELETE Products API",
      error,
    });
  }
};

//CREATE PRODUCT REVIEW AND COMMENT
export const productReviewController = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    // find product
    const product = await productModel.findById(req.params.id);
    //check previous review
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      return res.status(400).send({
        success: false,
        message: "Product Already Reviewed",
      });
    }
    //review object
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    // passing review object to review array
    product.reviews.push(review);
    // number of reviews
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    //save
    await product.save();
    res.status(200).send({
      success: true,
      message: "Review Added Successfully",
    });
  } catch (error) {
    console.log(error);
    // cast error ||  OBJECT ID
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error In DELETE Products API",
      error,
    });
  }
};
