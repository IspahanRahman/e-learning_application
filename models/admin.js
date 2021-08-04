const {Schema}=require('mongoose')
const connection=require('../database/database_config')

const adminSchema=new Schema({
    username:{
        type:String,
        trim:true,
        maxlength:15,
        required:true

    },
    password:{
        type:String,
        required:true
    }
})

const Admin=connection.model('Admin',adminSchema)

module.exports=Admin
