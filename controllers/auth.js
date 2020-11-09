const User = require('../models/user')
const jwt = require('jsonwebtoken') //Used to generate signed token
const expressJwt = require('express-jwt') //for authorization check
const { errorHandler }  = require('../helpers/dbErrorHandlers')

exports.signup = (req,res) =>{
    // console.log('req.body',req.body);
    const user = new User(req.body);
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                // err : errorHandler(err)
                error : 'user already exist'
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
    })
};


exports.signin = (req,res) =>{
    //find user based on email
    const { email,password } = req.body;
    User.findOne({ email },(err,user) =>{
        if(err || !user){
            return res.status(400).json({
                error : 'User with email doesnot exist. SignUp again'
            });
        }
        //if user found make sure email and password match
        //create authenticate method in user model
        if(!user.authenticate(password)){
            // res.send(user.authenticate(password))
            return res.status(401).json({
                error : 'Email and password does not match'   
            });
        }

        //generate signed token with user id and secret
        const token = jwt.sign({ _id : user._id }, process.env.JWT_SECRET)

        //persist the token as 't' in cookie with expiry date
        res.cookie('t',token,{ expire: 10000 + Date.now() });

        //return response with user and token with frontend client
        const { _id, name, email, role } = user
        return res.json({ token, user : { _id,name,email,role } });
    });
};

exports.signout = (req,res) =>{
    res.clearCookie('t')
    res.json({ message : 'Signout successful' });
};


exports.requireSignin = expressJwt({ 
    secret : process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty : 'auth'
});


exports.isAuth = (req,res,next) =>{
    user = req.profile && req.auth && req.profile._id == req.auth._id
    if(!user){
        res.status(403).json({
            error : 'Access Denied'
        });
    }
    next();
};


exports.isAdmin = (req,res,next) =>{
    if(req.profile.role === 0){
        res.status(403).json({
            error : 'Admin resource ! Access Denied'
        });
    }
    next();
};