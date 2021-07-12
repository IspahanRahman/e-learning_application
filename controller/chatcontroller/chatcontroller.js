const connection=require('../../database/database_config')
const Chat=require('../../models/Chat')
const Register=require('../../models/registers')
const errorFormatter=require('../../utils/validationErrorFormatter')
const {validationResult}=require('express-validator')
const Flash =require('../../utils/Flash')
const io=require('socket.io')


exports.getChatJoinController=(req,res,next)=>{
  res.render('rooms',{
    error:{},
    value:{},
    flashMessage:Flash.getMessage(req)
  })
}

exports.postChatJoinController=async (req,res,next)=>{
  let {username}=req.body
  let errors=validationResult(req).formatWith(errorFormatter)

  if(!errors.isEmpty()){
    req.flash('fail','Please Check Your form')
    return res.render('rooms',{
        error:errors.mapped(),
        value:{
          username
      },
        flashMessage:Flash.getMessage(req)
        
    })
  }
  try {
    let user=await Register.findOne({username})
    if(!user){
        req.flash('fail','Please Provide Valid Credentials')
        return res.render('rooms',{
            error:{},
            flashMessage:Flash.getMessage(req)
        })
    }
    req.flash('success','Successfully LoggedIn')
    res.redirect('/chat/message')   
  } catch(e) {
     next(e)
  }

}

exports.getChatMessageController=(req,res,next)=>{
  
  res.render('chatroom',{
  error:{},
  value:{},
  flashMessage:Flash.getMessage(req)

})

}

exports.postChatMessageController=async (req,res,next)=>{
  try{
    let message=new Chat(req.body)
    await message.save()
    var censored=await Chat.findOne({message:'badword'})
    if(censored){
      await Chat.remove({_id:censored.id})
    }
    else{
      socket.emit('message',req.body)
      res.sendStatus(200)
    }
  res.redirect('/chat/message')
  }catch(e){
    res.sendStatus(500)
    return console.log('error',e)
   
  }
  
  
}

exports.showMessageController=(req,res,next)=>{
 Chat.find({},(err,messages)=>{
   res.send(messages)
 })
}



