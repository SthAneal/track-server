const express = require('express');
require('./db/mongoose');

const app = express();
app.use(express.json());

const {PORT} = require('../config');

app.listen(PORT,()=>{
    console.info('server is running on '+ PORT);
});