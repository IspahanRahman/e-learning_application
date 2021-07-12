const router=require('express').Router()

router.get('/', function(req, res) {
    res.render('welcome');
  })
  
  module.exports = router