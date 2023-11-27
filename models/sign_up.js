const mongoose = require('mongoose');

const sign_up_schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const sign_up = mongoose.model('sign_up',sign_up_schema);

module.exports = sign_up