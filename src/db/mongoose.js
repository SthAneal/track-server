const mongoose = require('mongoose');
const {MONGO_URI} = require('../../config');

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.connection.on('connected',()=>{
    console.info('Connected to mongo instance.');
});

mongoose.connection.on('error', ()=>{
    console.warning('Connection failed to mongo instance.');
})


