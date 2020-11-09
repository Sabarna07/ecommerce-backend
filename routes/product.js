const express = require('express');
const router = express.Router(); 
const{ requireSignin, isAdmin, isAuth } = require('../controllers/auth');
const { userById } = require('../controllers/user.js');
const { create, productById, read, remove, update, list, listRelated, listCategories, listBySearch, photo, listSearch} = require('../controllers/product');

router.get('/product/:productId',read)
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove)
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, update)
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create)

//get product by id from post method
router.param('productId',productById)

//get user by id from post method
router.param('userId',userById)

router.get('/products',list)
router.get('/products/search',listSearch)
router.get('/products/related/:productId',listRelated)
router.get('/products/categories',listCategories)
router.post('/products/by/search',listBySearch)

//display product image from db
router.get('/products/photo/:productId',photo) 

module.exports = router;