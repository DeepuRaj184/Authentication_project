const passport = require('passport');
const LocalStratergy = require('passport-local').Strategy;
const sign_up = require('../models/sign_up');

passport.use(new LocalStratergy({
    usernameField:'email'
},
async function(email,password,done){
    try{
        const user = await sign_up.findOne({email:email})
        if(!user || password!=user.password){
            return done(null,false)
        }
        return done(null,user)
    }
    catch(err){
        console.log(err)
    }
}
))

passport.serializeUser(function(user,done){
    console.log("serilized user")
    return done(null,user.id)
})

passport.deserializeUser(async function(id,done){
    try{
        const user = await sign_up.findById(id);
        if(!user){
            return done(null,false)
        }
        return done(null,user)
    }
    catch(err){
        console.log(err)
        return done(err)
    }
})

passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/')
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next();
}