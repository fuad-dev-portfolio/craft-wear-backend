const Order = require('../models/Order');

// Generate unique order ID
const generateOrderId = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `CW-${timestamp}-${random}`;
};

// @desc    Create new order
// @route   POST /api/admin/orders
// @access  Public
const createOrder = async (req, res) => {
    try {
        const { customerInfo, deliveryInfo, items, subtotal, shippingCost, total, shippingMethod, paymentMethod, notes } = req.body;

        const order = await Order.create({
            orderId: generateOrderId(),
            customerInfo,
            deliveryInfo,
            items,
            subtotal,
            shippingCost,
            total,
            shippingMethod,
            paymentMethod,
            notes
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Public
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get single order
// @route   GET /api/admin/orders/:id
// @access  Public
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update order status
// @route   PUT /api/admin/orders/:id
// @access  Public
const updateOrderStatus = async (req, res) => {
    try {
        const { status, notes } = req.body;
        
        const order = await Order.findById(req.params.id);
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        order.status = status || order.status;
        if (notes !== undefined) {
            order.notes = notes;
        }
        
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Delete order
// @route   DELETE /api/admin/orders/:id
// @access  Public
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        await order.deleteOne();
        res.json({ message: 'Order removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder
};
