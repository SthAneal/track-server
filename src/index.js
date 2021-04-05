const express = require('express');
require('./db/mongoose');
const route = require('./routes/User');

const app = express();
app.use(express.json());
app.use(route);

const {PORT} = require('../config');

app.listen(PORT,()=>{
    console.info('server is running on '+ PORT);
});