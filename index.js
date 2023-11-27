const express = require('express');
const port = 8000;

const db = require('./config/mongoose')
const passport = require('passport')
const session = require('express-session');
const passportauth = require('./config/passport_auth');
const passportlocal = require('./config/passport_localstratergy');
const Mongostore = require('connect-mongo');
const flash = require('connect-flash')
const flashmsg = require('./config/flash');
const dotenv = require('dotenv')
require('dotenv').config()
const app = express();

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(express.static('./assets'))

app.set('view engine','ejs');
app.set('views','./views')

const expresslayouts = require('express-ejs-layouts');
app.use(expresslayouts);

// app.use(session({
//     name:'Authentication',
//     secret:'something',
//     saveUninitialized:false,
//     resave:false,
//     cookie:{
//         maxAge:(1000*60*100)
//     }
// }))

app.use(session({
    name:'Authentication',
    secret:'blahblahblah',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100),
    },
    store: Mongostore.create({
        mongoUrl: process.env.MONGO_URL,
        autoRemove: 'disabled'
    })
}));

app.use(passport.initialize())
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(express.urlencoded());
app.use(flash());
app.use(flashmsg.setFlash);

app.use('/',require('./routes/index'))
app.listen(port,function(err){
    if(err){
        console.log(err)
    }
    console.log("server is running in port" ,`${port}`)
})