const express = require('express');
const router = express.Router();
const {signup,signin, signout.requireSignin} = require('../controllers/authController');

//validators
const {runValidator} = require('../validators');
const {userSignupValidator,userSigninValidator} = require('../validators/auth')

router.post('/signup',userSignupValidator,runValidator,signup);
router.post('/signin',userSigninValidator,runValidator,signin);
router.get('/signout',signout)

router.get('/secret',requireSignin,(req,res) =>{
    res.json({
        "message":request.user
    });
})

module.exports = router;