module.exports.home = function(req,res){
    return res.render('sign_in',{title:"sign-in"})
}

module.exports.sign_up = function(req,res){
    return res.render('sign_up',{title:"sign-up"})
}

module.exports.createsession=function(req,res){
    console.log("inside")
    return res.render('logged_in',{title:"logged-in"})
}