require('dotenv').config()
const express=require('express')
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const monk=require('monk')
const favicon = require('serve-favicon');
const createError = require('http-errors');
const app=express()
const dateTime=require('simple-datetime-formater')
const setMiddleware=require('./middleware/middleware')
const setroutes=require('./routes/route')
const cors = require('./utils/cors');
const port=process.env.PORT || 8080
require('./database/database_config')
require('./config/passport')(passport)

//require the http module
const http=require('http').Server(app)

//require the socket.io module
const io=require('socket.io')



app.set('view engine','ejs')
app.set('views','views')


// Middlewares
app.use(cors)
app.use(cookieParser())
setMiddleware(app)




// const index=require('./controller/index')
// const students=require('./controller/student')
// const faculties=require('./controller/faculties')
// const courses=require('./controller/courses')
// const make_exam=require('./controller/make_exam_controller')
// const take_exam = require('./controller/take_exam_controller');
// const admin = require('./controller/admin');
// const login = require('./controller/login_controller');


// app.use('/',index);
// app.use('/students', students);
// app.use('/courses', courses);
// app.use('/faculties', faculties);
// app.use('/make_exam', make_exam);
// app.use('/take_exam', take_exam);
// app.use('/admin', admin);
// app.use('/login', login);

// routes
setroutes(app)

// integrating socketio
socket=io(http)
app.get('/',(req,res)=>{
  res.render('index')
})
app.get('*',(req,res)=>{
    res.send('This page is not found')
})

//database connection
const Chat = require("./models/Chat");
const connection = require('./database/database_config')

//setup event listener
socket.on("connection", socket => {
  console.log("user connected");
  
  socket.on('message',function(data){

    console.log('message',data)
  })
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  //Someone is typing
  socket.on("typing", data => {
    socket.broadcast.emit("notifyTyping", {
      user: data.user,
      message: data.message
    });
  });

  //when soemone stops typing
  socket.on("stopTyping", () => {
    socket.broadcast.emit("notifyStopTyping");
  });

  socket.on("chat message", function(msg) {
    console.log("message: " + msg);

    //broadcast message to everyone in port:5000 except yourself.
    socket.broadcast.emit("received", { message: msg });
  });
});

// //listening to the port
http.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

