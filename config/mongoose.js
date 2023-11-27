const mongoose = require('mongoose');
require("dotenv").config()

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection

db.on('error',console.error.bind(console,"error in connection"));

db.once('open',function(){
    console.log("connected to data base")
})

module.exports = db;