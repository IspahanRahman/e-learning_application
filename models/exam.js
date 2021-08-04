const {Schema}=require('mongoose')
const connection=require('../database/database_config')

const examSchema=new Schema({
  exam_code:{
    type:String,
    trim:true,
    maxlength:30,
    required:true

},
exam_name:{
        type:String,
        trim:true,
        maxlength:255,
        required:true

    },
    course_code:{
        type:String,
        required:true,
        maxlength:55,
        trim:true
    },
    duration_hours:{
      type:Number,
      required:true
    },
    duration_minutes:{
      type:Number,
      required:true
    },
    
    question:[
      {
      question:{
        type:String
      },
        optionA:{
            type:String
          },
          optionB:{
            type:String
          },
        
          optionC:{
            type:String
          },
 
          optionD:{
            type:String
          },
          key:{
            type:String
          }
    }]
})

const Exam=connection.model('Exam',examSchema)

module.exports=Exam

