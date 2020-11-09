const express = require('express')
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById, addOrderToUserHistory } = require('../controllers/user');
const { create, listOrders, getStatusValues, updateOrderStatus, orderById } = require('../controllers/orders');
const { decreaseQuantity } = require('../controllers/product');

router.post('/order/create/:userId',requireSignin,isAuth,addOrderToUserHistory,decreaseQuantity,create)

router.get('/order/list/:userId',requireSignin,isAuth,isAdmin,listOrders)

router.get('/order/status-values/:userId',requireSignin,isAuth,isAdmin,getStatusValues)

router.put('/order/:orderId/status/:userId',requireSignin,isAuth,isAdmin,orderById,updateOrderStatus)

router.param('userId',userById)
router.param('userId',orderById)

module.exports = router