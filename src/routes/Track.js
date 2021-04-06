const express = require('express');
const route = express.Router();
const Track = require('../models/Track');
const auth = require('../middleware/auth');

// get all the tracks created by the user
route.get('/tracks',auth, async (req, res)=>{
    try {
        await req.user.populate('tracks').execPopulate();
        if(req.user.tracks.length ===0){
            res.status(404).send({message:'No tracks found!'});
        }else{
            res.send(req.user.tracks);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// create tracks
route.post('/tracks', auth, async (req, res)=>{
    const track = new Track({...req.body, userId: req.user._id});

    try {    
        await track.save();
        res.status(201).send(track);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = route;