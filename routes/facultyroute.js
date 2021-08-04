const router=require('express').Router()

const {
    getFacultyHomePageController,
    getLogoutController,
    getFacultyAddPageController,
    postFacultyAddController,
    getUsernameController,
    getUserNameEditController,
    postFacultyEditController,
    getFacultyDeleteController,
    postFacultyDeleteController,
    getAssignFormController,
    postAssignFormController,
    getUnassignFormController,
    postUnassignFormController
}=require('../controller/faculties')

router.get('/home',getFacultyHomePageController)
router.get('/logout',getLogoutController)
router.get('/new',getFacultyAddPageController)
router.post('/create',postFacultyAddController)
router.get('/get_username_edit',getUsernameController)
router.get('/edit',getUserNameEditController)
router.post('/update',postFacultyEditController)
router.get('/get_username_delete',getFacultyDeleteController)
router.post('/delete',postFacultyDeleteController)
router.get('/assign_form',getAssignFormController)
router.post('/assign',postAssignFormController)
router.get('/unassign_form',getUnassignFormController)
router.post('/unassign',postUnassignFormController)

module.exports=router