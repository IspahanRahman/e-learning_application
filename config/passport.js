const LocalStrategy=require('passport-local').Strategy
const AdminUser = require('../models/admin.js');
const StudentUser = require('../models/student.js');
const FacultyUser = require('../models/faculty.js');


module.exports=(passport)=>{
    passport.serializeUser((user,done)=>{
        done(null,JSON.stringify(user))
    })

    passport.deserializeUser((user,done)=>{

    })

    passport.use('local-login-admin',new LocalStrategy({
        passReqToCallback:true
    },
    (req,username,password,done)=>{
        AdminUser.findByUserName(username,(err,user)=>{
            if(err){
                return done(err)
            }
            if(!user){
                return done(null,false,req.flash('loginMessage','No user found'))
            }

            if(user.password!=password)
            {
                return done(null,false,req.flash('loginMessage','Oops! Wrong password'))
            }
            user.usertype
            return done(null,user)
        })
    }))

    passport.use('local-login-student', new LocalStrategy({
        passReqToCallback : true
    },
    (req, username, password, done)=>{
        StudentUser.findByUserName(username, function(err, user) {
            if (err)
                return done(err);
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.'));        
            if (user.password!=password)
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            user.usertype='student';
            return done(null, user);
        });

    }));
    
    passport.use('local-login-faculty', new LocalStrategy({
        passReqToCallback : true
    },
    (req, username, password, done)=>{
        FacultyUser.findByUserName(username, function(err, user) {
            if (err)
                return done(err);
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.'));        
            if (user.password!=password)
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            user.usertype='faculty';
            return done(null, user);
        });

    }));

}