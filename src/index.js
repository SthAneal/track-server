const express = require('express');
require('./db/mongoose');
const userRoute = require('./routes/User');
const trackRoute = require('./routes/Track');

const app = express();
app.use(express.json());
app.use(userRoute);
app.use(trackRoute);

const {PORT} = require('../config');

app.listen(PORT,()=>{
    console.info('server is running on '+ PORT);
});