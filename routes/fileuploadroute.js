const router=require('express').Router()
const multer = require('multer');
const storage=require('../middleware/fileuploadmiddleware')
const {
    showAllGetcontroller,
    fileUploadGetController,
    fileUploadPostController,
    allFilesGetController,
    singleFilesGetController,
    imageGetController,
    deleteFileController,
    downloadFileController
}=require('../controller/fileuploadcontroller/fileuploadcontroller');
const upload = multer({ storage });

router.get('/fileupload',showAllGetcontroller)
// router.get('/fileupload',fileUploadGetController)
router.post('/fileupload',upload.single('file'),fileUploadPostController)
router.get('/files',allFilesGetController)
router.get('/files/:filename',singleFilesGetController)
router.get('/image/:filename',imageGetController)
router.delete('/files/:id',deleteFileController)
router.get('/download/:id',downloadFileController)
module.exports=router