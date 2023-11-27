const sign_up = require('../models/sign_up')

module.exports.loggedin= async function(req,res){
    const email = await sign_up.findOne({email:req.body.email});
    if(!email){
        return res.redirect('back')
    }
    req.flash('success','logged in successfully')
    return res.render('logged_in',{title:"logged_in"})
    
}

module.exports.reset=async function(req,res){
    const email = await sign_up.findOne({email:req.body.email});
    const password = req.body.current_password;
    const new_password = req.body.new_password;
    const update={password:new_password}
    if(!email){
        console.log("user not found,create one")
    }
    if(password==email.password){
        const updated_password = await sign_up.findOneAndUpdate(email,update)
    }
    return res.redirect('/')
}

module.exports.loggedinpage=function(req,res){
    return res.render('logged_in',{title:"Logged_in"})
}

module.exports.destroy=function(req,res){
    req.logout((err)=>{
        if(err){
            console.log(err)
            return
        }
    })
    res.clearCookie("session")
    req.flash('success','logged out successfully')
    return res.redirect('/')
}