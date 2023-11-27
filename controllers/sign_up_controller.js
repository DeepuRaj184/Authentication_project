const sign_up = require('../models/sign_up');
const bcrypt = require('bcrypt')

module.exports.create =async  function(req,res){
    const user = await sign_up.findOne({email:req.body.email})
    if(req.body.password==req.body.confirm_password & !user){
        sign_up.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        })
        res.redirect('/')
    }
    else{
        console.log("password doesn't match or user email already available")
        res.redirect('back')
    }
}