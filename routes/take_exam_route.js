const router=require('express').Router()
const {
    getExamEntryPageController,
    postExamEntryPageController,
    getListController,
    postSubmitController,
    getPerformanceController,
    postPerformaceController
}=require('../controller/take_exam_controller')

router.get('/',getExamEntryPageController)
router.post('/exam',postExamEntryPageController)
router.get('/list',getListController)
router.post('/submit',postSubmitController)
router.get('/performance',getPerformanceController)

module.exports=router