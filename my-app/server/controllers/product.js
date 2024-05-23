import Product from "../models/Product";

export const getAllProducts = async (req, res) => {
  try {
    const { search } = req.query;
    let products;

    if (search) {
      const regex = new RegExp(search, "i");
      products = await Product.find({ title: regex });
    } else {
      products = await Product.find();
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      images,
      thumbnail,
      category,
      brand,
      stock,
      rating,
      discountPercentage,
      price,
    } = req.body;

    if (
      !title ||
      !description ||
      !images ||
      !thumbnail ||
      !category ||
      !brand ||
      !stock ||
      !rating ||
      !discountPercentage ||
      !price
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Product({
      title,
      description,
      images,
      thumbnail,
      category,
      brand,
      stock,
      rating,
      discountPercentage,
      price,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update an existing product
export const updateProduct = async (req, res) => {
  try {
    const data = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (data) {
      res.status(200).json({
        message: "Sua sarn phaarm thanh cong",
        data,
      });
    } else {
      res.status(404).json({
        message: "Khong ton tai san pham",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
