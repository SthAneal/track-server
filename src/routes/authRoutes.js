const express = require('express');

const router = express.Router();

router.post('/signup',(req, res)=>{
    res.send('You made a signup request');
});

module.exports = router;