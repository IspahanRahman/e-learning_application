require('dotenv').config()
const express=require('express')
const passport=require('passport')
const port=process.env.PORT
const app=express()
const http=require('http').Server(app)
const setMiddleware=require('./middleware/middleware')
require('./config/passport')(passport)
require('./database/database_config')

//Middleware
setMiddleware(app)

//set view engine
app.set('view engine','ejs')


app.use(express.static('public'))

// const db_username=process.env.DB_USERNAME
// const db_password=process.env.DB_PASSWORD

// const monk = require('monk');
// const  db = monk(`${db_username}:${db_password}@localhost:8080/myFirstDatabase`);


const index=require('./routes/indexroute')
const login = require('./routes/loginroutes');
const admin = require('./routes/adminroute');
const courses= require('./routes/courseroute')
const faculties=require('./routes/facultyroute')
const students=require('./routes/studentroute')
const make_exam=require('./routes/make_exam_route')
const take_exam=require('./routes/take_exam_route')
app.use('/',index)
app.use('/login',login)
app.use('/admin',admin)
app.use('/courses',courses)
app.use('/faculties',faculties)
app.use('/students',students)
app.use('/make_exam',make_exam)
app.use('/take_exam',take_exam)

//listening to the port
http.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})


