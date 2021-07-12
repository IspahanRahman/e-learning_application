const {body}=require('express-validator')
const Register=require('../../models/registers')

module.exports=[
    // body('username')
    // .not().isEmpty().withMessage('Username Can Not be Empty'),
    // // .custom(async username=>{
    // //     let user=await Register.findOne({username})
    // //     if(!user){
    // //         return Promise.reject('Username is not found')
    // //     }
    // // })
    // // .trim(),
    body('email')
    .not().isEmpty().withMessage('Email Can Not be Empty'),
    body('password')
    .not().isEmpty().withMessage('Password Can Not Be Empty')


]