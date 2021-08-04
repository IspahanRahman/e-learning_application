
const Admin=require('../models/admin')

exports.getAdminHomeController=(req,res)=>{
    res.render('admin/home',{title:'Options'})
}

exports.getLogoutController=(req,res)=>{
    req.logout()
    res.redirect('/')
}

