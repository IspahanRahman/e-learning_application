const {Schema}=require('mongoose')
const connection=require('../database/database_config')

const courseSchema=new Schema({
  coursename:{
        type:String,
        trim:true,
        maxlength:255,
        required:true

    },
    courseid:{
        type:String,
        required:true
    }
})

const Course=connection.model('Course',courseSchema)

module.exports=Course

