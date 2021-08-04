const {Schema}=require('mongoose')
const connection=require('../database/database_config')

const studentSchema=new Schema({
  name:{
    type:String,
    trim:true,
    maxlength:255,
    required:true
  },
  username:{
        type:String,
        trim:true,
        maxlength:55,
        required:true

    },
    rollno:{
      type:String,
      required:true
  },
    password:{
        type:String,
        required:true
    },
    courseid:[
      {
        type:String,
        required:true
      }
    ]
})

const Student=connection.model('Student',studentSchema)

module.exports=Student
