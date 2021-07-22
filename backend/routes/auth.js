const express = require('express');
const router = express.Router();
const {signup,signin, signout} = require('../controllers/auth');

//validators
const {runValidator} = require('../validators');
const {userSignupValidator,userSigninValidator} = require('../validators/auth')

router.post('/signup',userSignupValidator,runValidator,signup);
router.post('/signin',userSigninValidator,runValidator,signin);
router.get('/signout',signout)

module.exports = router;