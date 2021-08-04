const router=require('express').Router()
const {
    getAdminHomeController,
    getLogoutController
}=require('../controller/admin')

router.get('/home',getAdminHomeController)
router.get('/logout',getLogoutController)

module.exports = router;

// function isLoggedIn(req,res,next){
//     if (req.isAuthenticated()&&req.user.usertype=='admin')
//     {return next();}

// // if they aren't redirect them to the home page
// res.redirect('/');
// }