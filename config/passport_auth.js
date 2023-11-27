const passport = require('passport');
require('dotenv').config()
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const sign_up = require('../models/sign_up')
const crypto = require('crypto')

console.log("clientID:",process.env.GOOGLE_CLIENT_ID)
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope:["profile","email"],
    // passReqToCallback:true
  },
  async function(accessToken, refreshToken, profile, done) {
    const user_email = profile.emails[0].value
    let user = await sign_up.findOne({email:user_email})
    if(user){
      return done(null,user);
    }else{
      try{
        let created_user = await sign_up.create({
          name:profile.displayName,
          email:profile.emails[0].value,
          password:crypto.randomBytes(20).toString('hex')
        })
        if(created_user){
          return done(null,created_user)
        }
      }
      catch(err){
        console.log(err)
        return done(err)
      }
    }
  }
));

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser( async function(id,done) {
  try{
    let user = await sign_up.findById(id) 
    if(user){
      return done(null,user)
    }
  }
  catch(err){
    console.log(err)
    return done(err)
  }  
});

module.exports=passport