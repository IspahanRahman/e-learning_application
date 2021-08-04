const {Schema}=require('mongoose')
const connection=require('../database/database_config')

const facultySchema=new Schema({
  name:{
    type:String,
    trim:true,
    maxlength:255,
    required:true

},
  username:{
        type:String,
        trim:true,
        maxlength:30,
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

const Faculty=connection.model('Faculty',facultySchema)

module.exports=Faculty

