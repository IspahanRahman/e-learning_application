require('dotenv').config()
const mongoose=require('mongoose')
mongoose.Promise=require('bluebird')
const Grid = require('gridfs-stream');

const db_username=process.env.DB_USERNAME
const db_password=process.env.DB_PASSWORD

const MONGODB_URI=`mongodb+srv://${db_username}:${db_password}@cluster0.d2fg3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

let gfs

const connection=mongoose.createConnection(MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
// connection.model('Register',require('../models/registers'))

connection.once('open',()=>{
    gfs=Grid(connection.db,mongoose.mongo)
    gfs.collection('uploads')
})

.then(()=>{
    console.log('database connect successfully')
})
.catch((e)=>{
    console.log(e)
})

module.exports=connection