const router=require('express').Router()

const{
    getWelcomePageController
}=require('../controller/index')

router.get('/',getWelcomePageController)

module.exports=router