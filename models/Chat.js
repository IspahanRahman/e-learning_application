const mongoose=require('mongoose')
const connection=require('../database/database_config')
const chatSchema= new mongoose.Schema({

    message:{
        type:String
    },
    sender:{
        type:String
    },
    createDate:{
        type:Date,
        default:Date.now
    }
})

const Chat=connection.model('Chat',chatSchema)

module.exports=Chat