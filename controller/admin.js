const router=require('express').Router()
const Admin=require('../models/admin')

router.get('/home',isLoggedIn,(req,res)=>{
    res.render('admin/home', { title: 'Options'});
})

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;

function isLoggedIn(req,res,next){
    //if user is authenticated in the session then carry on
    if(req.isAuthenticated()&&req.user.usertype=='admin')
    {return next();}

// if they aren't redirect them to the home page
res.redirect('/');
}