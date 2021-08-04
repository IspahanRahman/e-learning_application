const router=require('express').Router()

const {
    getStudentHomeController,
    getLogoutController,
    getStudentAddController,
    postStudentAddController,
    getStudentUsernameController,
    getStudentEditController,
    postStudentEditController,
    getStudentDeleteController,
    postStudentDeleteController,
    getRegisterFormController,
    postRegisterFormController,
    getDeregisterController,
    postDergisterController

}=require('../controller/students')

router.get('/home',getStudentHomeController)
router.get('/logout',getLogoutController)
router.get('/new',getStudentAddController)
router.post('/create',postStudentAddController)
router.get('/get_username_edit',getStudentUsernameController)
router.get('/edit',getStudentEditController)
router.post('/update',postStudentEditController)
router.get('/get_username_delete',getStudentDeleteController)
router.post('/delete',postStudentDeleteController)
router.get('/register_form',getRegisterFormController)
router.post('/register',postRegisterFormController)
router.get('/deregister_form',getDeregisterController)
router.post('/deregister',postDergisterController)

// router.post('/register',postAssignFormController)


module.exports=router