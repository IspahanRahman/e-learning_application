require('dotenv').config()
const express=require('express')
const methodOverride = require('method-override');
const morgan=require('morgan')
const passport = require('passport');
const session=require('express-session')
const flash=require('connect-flash')
const MongoDBStore=require('connect-mongodb-session')(session);
const{bindUserWithRequest}=require('./authMiddleware')
const setLocals=require('./setLocals')
var cookieParser = require('cookie-parser');

const db_username=process.env.DB_USERNAME
const db_password=process.env.DB_PASSWORD
const secret=process.env.SECRET_KEY

const MONGODB_URI=`mongodb+srv://${db_username}:${db_password}@cluster0.d2fg3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`


const store=new MongoDBStore({
    uri:MONGODB_URI,
    collection:'sessions',
    expires:1000*60*60*2
});

//Middleware
const middleware=[
    morgan('dev'),
    express.static('public'),
    cookieParser(),
    express.urlencoded({extended:false}),
    express.json(),

    methodOverride('_method'),
    session({
        secret:secret,
        resave:false,
        saveUninitialized:false,
        store:store
    }),
    flash(),
    passport.initialize(),
    passport.session(),
   bindUserWithRequest(),
   setLocals()
  
]

module.exports=(app)=>{
    middleware.forEach(m=>{
        app.use(m)
    })
}