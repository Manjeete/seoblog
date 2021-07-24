const User = require('../models/user');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = (req,res) =>{
    User.findOne({email:req.body.email}).exec((err,user) =>{
        if(user) {
            return res.status(400).json({
                error:'Email is taken'
            })
        }

        const {name,email,password} = req.body
        let username = shortId.generate()
        let profile = `${process.env.CLIENT_URL}/profile/${username}`

        let newUser = new User({name,email,password,profile,username})

        newUser.save((err,success) =>{
            if(err){
                return res.status(400).json({
                    error:err
                })
            }
            // res.json({
            //     user:success
            // })

            res.json({
                message:'Signup success! Please Signin'
            })
        })
    })
};


exports.signin = async (req,res) => {
    const {email,password} = req.body
    await User.findOne({email:email}).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({
                error:"User with that email does not exist. Please Signup"
            });
        }

        //authenticate
        if(!user.authenticate(password)){
            return res.status(400).json({
                error:"Email or password does not match"
            })
        }

        //generate a token sent to client
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        res.cookie('token',token,{expiresIn:'1d'});
        const {_id,username,name,email,role} = user;
        return res.satus(200).json({
            token,
            user:{_id,username,name,email,role}
        });
    });
};


exports.signout = (req,res) =>{
    res.clearCookie('token');
    res.json({
        message:'Signout success'
    });
};


exports.requireSignin = expressJwt({
    secret:process.env.JWT_SECRET,
    algorithms: ['RS256']
});