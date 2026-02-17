const Product = require('../models/Product.js');
const mongoose = require('mongoose');

// @desc    Fetch all products
// @route   GET /api/user/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Fetch products by category
// @route   GET /api/user/products/category/:category
// @access  Public
// Optional helper if we want backend filtering, though frontend filtering is also fine for small datasets
const getProductsByCategory = async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Fetch single product
// @route   GET /api/user/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const getSingleProduct = async (req, res) => {

    const product = await Product.findOne({
        slug: req.params.slug
    });

    if (!product) {
        return res.status(404).json({ message: "Not found" });
    }

    res.json(product);
};


module.exports = {
    getProducts,
    getProductsByCategory,
    getProductById,
    getSingleProduct
};
