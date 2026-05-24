import productModel from "../models/product.js";

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const { title, description, price, category, image, stock } = req.body;
        const newProduct = new productModel({ title, description, price, category, image, stock });
        await newProduct.save();
        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
    try {
        const {search, category} = req.query;

        let filter = {};
        if (search) {
            filter.title = { $regex: search, $options: "i" };
        }
        
        if (category) {
            filter.category = category;
        }

        const product = await productModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
    try {
        const { title, description, price, category, image, stock } = req.body;
        const product = await productModel.findByIdAndUpdate(
            req.params.id,
            { title, description, price, category, image, stock },
            { new: true }
        );
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

