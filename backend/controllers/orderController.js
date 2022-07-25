const Order = require('../models/order');
const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');

// Create a new order => /api/v1/order/new
exports.newOrder = catchAsyncError(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(200).json({
        status: 'success',
        order
    });

})

// Get single order => /api/v1/order/:id
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
        return next(new ErrorHandler(`Order not found ${req.params.id}`, 404));
    }

    res.status(200).json({
        status: 'success',
        order
    });
})

// Get logged in user's orders => /api/v1/orders/me
exports.getUserOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        status: 'success',
        orders
    });
})

// Get all orders - Admin => /api/v1/admin/orders
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        status: 'success',
        totalAmount,
        orders
    });
})

// Update / process order - Admin => /api/v1/admin/order/:id
exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(order.status === 'delivered') {
        return next(new ErrorHandler(`Order already delivered ${req.params.id}`, 400));
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity);
    })

    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now();

    await order.save();

    res.status(200).json({
        success: true,
    });
})

async function updateStock(product, quantity) {
    const productToUpdate = await Product.findById(product);
    productToUpdate.stock -= quantity;
    await productToUpdate.save({ validateBeforeSave: false });
}

// Delete order - Admin => /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler(`Order not found ${req.params.id}`, 404));
    }

    await order.remove();

    res.status(200).json({
        success: true,
    });
})
