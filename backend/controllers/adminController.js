const Product = require('../models/Product');
const slugify = require('slugify');

// @desc    Create a new product
// @route   POST /api/admin/products
// @access  Public (for now, simplistic admin)
const createProduct = async (req, res) => {
    try {
        const { name, price, description, category, image } = req.body;

        const slug =
            slugify(name, { lower: true, strict: true })
            + "-" +
            Date.now().toString().slice(-5);

        if (!name || !price || !description || !category || !image || !slug) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }

        const product = new Product({
            name,
            price,
            description,
            category,
            image,
            slug
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/admin/products/:id
// @access  Public
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/admin/products/:id
// @access  Public
const updateProduct = async (req, res) => {
    try {
        const { name, price, description, category, image } = req.body;

        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.price = price || product.price;
            product.description = description || product.description;
            product.category = category || product.category;
            product.image = image || product.image;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct
};
