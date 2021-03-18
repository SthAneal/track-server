const express = require('express');
const mongoose = require('./db/mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();

const {PORT}  = require('../config');

const db = mongoose;

db.connection.on('connected', ()=>{
    console.log('connected to the mongo instancesss');
});

db.connection.on('error', ()=>{
    console.log('error on connection to the mongo db instance');
});


app.use(authRoutes);

app.get('/',(req, res)=>{
    res.send('Hi Meera!!');
});

app.listen(PORT || 3000, ()=>{
    console.log(`listening to port ${PORT}`);
});
