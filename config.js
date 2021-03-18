const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI
};