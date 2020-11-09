const express = require('express');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById, read, update, purchaseHistory } = require('../controllers/user');
const router = express.Router()

router.get('/secret/:UserId',requireSignin, isAuth, isAdmin, (req,res) =>{
    res.json({
        user : req.profile
    });
});
router.param('UserId',userById)

router.get('/user/:UserId', requireSignin, isAuth, read)
router.put('/user/:UserId', requireSignin, isAuth, update)
router.get('/orders/by/user/:UserId', requireSignin, isAuth, purchaseHistory)


module.exports = router;