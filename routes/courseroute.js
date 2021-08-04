const router=require('express').Router()

const {
    getCoursePageController,
    postCourseController,
    getCourseEditController,
    getCourseEditPageController,
    postCourseEditController,
    getDeleteController,
    postDeleteController

}=require('../controller/courses')

router.get('/new',getCoursePageController)
router.post('/create',postCourseController)
router.get('/get_courseid_edit',getCourseEditController)
router.get('/edit',getCourseEditPageController)
router.post('/update',postCourseEditController)
router.get('/get_courseid_delete',getDeleteController)
router.post('/delete',postDeleteController)
module.exports=router

// function isLoggedIn(req,res,next){
//     if (req.isAuthenticated()&&req.user.usertype=='admin')
//     {return next();}

// // if they aren't redirect them to the home page
// res.redirect('/');
// }