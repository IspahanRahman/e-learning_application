const router=require('express').Router()

const {
    getNewExamController,
    postNewExamController,
    getQuestionListController,
    getAddQuestionController,
    postAddQuestionController,
    postCreateQuestionController,
    getSubmitController,
    getListController
}=require('../controller/make_exam_controller')

router.get('/new',getNewExamController)
router.post('/create',postNewExamController)
router.get('/question_list',getQuestionListController)
router.get('/add_question',getAddQuestionController)
router.post('/add_question',postAddQuestionController)
router.post('/create_question',postCreateQuestionController)
router.get('/submit',getSubmitController)
router.get('/list',getListController)
module.exports=router