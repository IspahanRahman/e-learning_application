const {body}=require('express-validator')
const Register=require('../models/registers')

module.exports=[
    body('username')
    .not().isEmpty().withMessage('Username Cant Not Be Empty')
    .custom(async username=>{
        let user=await Register.findOne({username})
        if(!user){
            return Promise.reject('Username not found')
        }

    })
    .trim()
]