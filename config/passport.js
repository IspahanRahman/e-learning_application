const LocalStrategy=require('passport-local').Strategy
const AdminUser=require('../models/admin')
const FacultyUser=require('../models/faculty')
const StudentUser=require('../models/student')


module.exports=(passport)=>{
    passport.serializeUser((user,done)=>{
        done(null,JSON.stringify(user))
    })

    passport.deserializeUser((user,done)=>{
        done(null,JSON.parse(user))
    })

    passport.use('local-login-admin',new LocalStrategy({
        passReqToCallback:true
    },(req,username,password,done)=>{
        AdminUser.findOne({username},(err,user)=>{
            if(err){
                return done(err)
            }
            if(!user){
                return done(null,false,req.flash('loginMessage','No user found'))
            }

            if(user.password!=password){
                return done(null,false,req.flash('loginMessage','Oops! Wrong password'))
            }
            user.usertype='admin'
            return done(null,user)
        })
    }))

    passport.use('local-login-student',new LocalStrategy({
        passReqToCallback:true
    },(req,username,password,done)=>{
        StudentUser.findOne({username},(err,user)=>{
            if(err){
                return done(err)
            }
            if(!user){
                return done(null,false,req.flash('loginMessage','No User found'))
            }

            if(user.password!=password){
                return done(null,false,req.flash('loginMessage','Oops! Wrong password'))
            }
            user.usertype='student'
            return done(null,user)
        })
    }))

    passport.use('local-login-faculty',new LocalStrategy({
        passReqToCallback:true
    },(req,username,password,done)=>{
        FacultyUser.findOne({username},(err,user)=>{
           if(err){
               return done(err)
           }
           if(!user){
               return done(null,false,req.flash('loginMessage','No user found'))
           } 

           if(user.password!=password){
               return done(null,false,req.flash('loginMessage','Oops! Wrong password'))
           }

           user.usertype='faculty'
           return done(null,user)

        })
    }))
}
