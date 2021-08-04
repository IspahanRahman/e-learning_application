const {Schema}=require('mongoose')
const connection=require('../database/database_config')

const responseSchema=new Schema({
  username:{
        type:String,
        trim:true,
        maxlength:30,
        required:true

    },
    course_code:{
        type:String,
        required:true,
        maxlength:55,
        trim:true
    },
    response:{
        type:String

    }
})

const Response=connection.model('Response',responseSchema)

module.exports=Response