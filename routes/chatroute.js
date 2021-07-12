const router=require('express').Router()
const chatValidator=require('../validator/chatValidator')
const connection=require('../database/database_config')
const Chat=require('../models/Chat')

const {
    getChatJoinController,
    postChatJoinController,
    getChatMessageController,
    postChatMessageController,
    showMessageController
}=require('../controller/chatcontroller/chatcontroller')

router.get('/join',getChatJoinController)
router.post('/join',chatValidator,postChatJoinController)
router.get('/message',getChatMessageController)
router.post('/message',postChatMessageController)
router.get('/messages',showMessageController)

module.exports=router