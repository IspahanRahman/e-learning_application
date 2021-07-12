const {body}=require('express-validator')
const Register=require('../../models/registers')

module.exports=[
  body('username')
  .isLength({min:2,max:15}).withMessage('Username must be Between 2 to 15 chars')
  .custom(async username=>{
      let user=await Register.findOne({username})
      if(user){
          return Promise.reject('Username Already used')
      }
  })
  .trim(),
  
    body('email')
    .isEmail().withMessage('Please Provide a valid Email')
    .custom(async email=>{
        let user =await Register.findOne({email})
        if(user){
            return Promise.reject('Email Already Exists')
        }
    })
    .normalizeEmail(),


    body('password')
    .isLength({min:5}).withMessage('Your password Must be greater than 5 chars'),

    body('confirmPassword')
    .isLength({min:5}).withMessage('Your Password Must be greater than 5 chars')
    .custom( (confirmPassword,{req})=>{

        if(confirmPassword!=req.body.password){
            return Promise.reject('Password does not Match')
        }
        return true
    })
]