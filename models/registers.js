const connection=require('../database/database_config')
const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        maxlength:15,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    type:{
        type:String
    }
},
{
    bufferTimeoutMS:1000
})


const Register= connection.model("Register",userSchema)

module.exports=Register
