const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const {MY_SECURE_KEY} = require('../../config');

const router = express.Router();

router.post('/signup',async (req, res)=>{
    const {email, password} = req.body;
    try {
        const newUser = new User({email, password});
        const user = await newUser.save();
        const token = jwt.sign({userId:user._id},MY_SECURE_KEY);
        res.send({user,token});
    } catch (err) {
        return res.status(422).send(err.message);
    }
    

});

module.exports = router;