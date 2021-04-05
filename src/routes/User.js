const express = require('express');
const route = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

route.post('/users', async (req, res)=>{
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch (error) {
        res.status(400).send(error);
    }
});

route.post('/users/login', async (req, res)=>{
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();    
        res.send({user, token});
    } catch (error) {
        res.status(400).send(error.message);
    }
});

route.post('/users/logout', auth, async (req, res)=>{
   try {
       req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token;
       });
       await req.user.save();
       res.send(req.user);
   } catch (error) {
       res.status(500).send(error);
   }
});

route.get('/users', auth, async (req, res)=>{
    
    res.send(req.user);
});



module.exports = route;