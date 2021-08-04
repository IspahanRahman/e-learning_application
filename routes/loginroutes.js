const router=require('express').Router()
const passport=require('passport')
const {
    loginGetController,
}=require('../controller/login_controller')



router.get('/',loginGetController)
router.post('/authenticate_admin', passport.authenticate('local-login-admin', {
    successRedirect:'../admin/home',
    failureRedirect : '/',
    failureFlash : true 
}));

// router.post('/login/authenticate_admin',(req,res)=>{

//     res.send('Welcome to register page')
// })

router.post('/authenticate_student', passport.authenticate('local-login-student', {
    successRedirect : '../students/home',
    failureRedirect : '/', 
    failureFlash : true 
}));

router.post('/authenticate_faculty', passport.authenticate('local-login-faculty', {
    successRedirect : '../faculties/home', 
    failureRedirect : '/', 
    failureFlash : true 
}));




module.exports = router;