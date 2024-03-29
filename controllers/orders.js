const { errorHandler } = require("../helpers/dbErrorHandlers");
const { Order } = require("../models/order")

exports.orderById = (req,res,next,id) =>{
    Order.findById(id)
    .populate("products.product","name price")
    .exec((error,order)=>{
        if(error){
            return res.status(400).json({
                error : error
            })
        }
        req.order = order;
        next();
    });
}

exports.create = (req,res) =>{
    // console.log('create orders',req.body)
    req.body.order.user = req.profile
    const order = new Order(req.body.order)
    order.save((error,data)=>{
        if(error){
            return res.status(400).json({
                error : error
            })
        }
        res.json(data)
        console.log(data)
    });
}

exports.listOrders = (req, res) => {
    Order.find()
        .populate('user', '_id name address')
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(error)
                });
            }
            res.json(orders);
        });
};

exports.getStatusValues = (req, res) => {
    res.json(Order.schema.path('status').enumValues);
};


exports.updateOrderStatus = (req, res) => {
    Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (err, order) => {
        if (err) {
            return res.status(400).json({
                error: error
            });
        }
        res.json(order);
        // console.log(order)
    });
};