exports.loginGetController=(req,res)=>{
    const usertype=req.query.usertype

    if(usertype=='admin'){
        res.render('login',{title:'Admin Login', method:'authenticate_admin'})
    }
    if(usertype=='student'){
        res.render('login',{title:'Student Login', method:'authenticate_student'})
    }
    if(usertype=='faculty'){
        res.render('login',{title:'Faculty Login', method:'authenticate_faculty'})
    }
}



