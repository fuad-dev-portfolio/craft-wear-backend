const express = require('express');
const router = express.Router();
const { createProduct, deleteProduct, updateProduct } = require('../controllers/adminController.js');

router.route('/').post(createProduct);
router.route('/:id').delete(deleteProduct).put(updateProduct);

module.exports = router;
