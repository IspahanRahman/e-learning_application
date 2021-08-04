const Student=require('../models/student')
const Course=require('../models/course')

var default_username='User Name'
var default_student = {
    username: "Your Username",
    password: "Password",
    name: "Name",
    rollno: "Roll Number"
  };

var default_username = "User Name"; 

var default_courseid = "Course Code";

exports.getStudentHomeController=(req,res)=>{
	res.render('students/home', { title: 'Student Home Page', student: default_student});
}

exports.getLogoutController=(req,res)=> {
    req.logout();
    res.redirect('/');
}


exports.getStudentAddController=(req,res)=>{
	res.render('students/new', { title: 'Add New Student', student: default_student});
}


exports.postStudentAddController=async (req,res)=>{
    try{
        let student=new Student(req.body)
        await student.save()
        res.redirect('/admin/home')
    
    }
    catch(e){
       res.redirect('/faculties/new')
       res.status(500)
       console.log(e)
    }
}

exports.getStudentUsernameController=(req,res)=>{
    res.render('students/get_username_edit', { title: "Get Username", username: default_username});
}

exports.getStudentEditController=(req,res)=>{
    let username=req.query.username

    Student.findOne({username},(err,doc)=>{
        if(err)
        res.send('Some error Occured')
        else{
            if(doc)
            res.render('students/edit',{title:'Edit Student',student:doc})
            else
            res.redirect('/students/get_username_edit')
        }
    })
}

exports.postStudentEditController=async(req,res)=>{
    let {name,username,password,rollno}=req.body
    let studentId=req.param._id
    try{
        let student=await Student.findOne({studentId})
        if(!student){
         let error=new Error('Student Not Found')
         res.render('students/edit')
         error.status=404
         throw error 
         
        }
        await Student.findOneAndUpdate(
            {_id:student._id},
            {$set:{name,username,password,rollno}},
            {new:true}
            )
            res.redirect('/admin/home')
    }
    catch(e){
        console.log(e)
        
    }
   
}

exports.getStudentDeleteController=(req, res)=>{
	var default_username = "User Name";
	res.render('students/get_username_delete', { title: "Get Username", username: default_username});
}

exports.postStudentDeleteController=async (req,res)=>{
    let username=req.body.username
    console.log(username)
   
    try{
        let student=await Student.findOne({username})
        console.log(student)
        if(!student){
         let error=new Error('Student Not Found')
         res.render('students/get_username_delete')
         error.status=404
         throw error 
         
        }
        await Student.findOneAndDelete(
            {username}
            )
         await Student.findOneAndUpdate(
             {$pull:{'student':student._id}}
         )
            res.redirect('/admin/home')
    }
    catch(e){
        console.log(e)
        
    }
 
 }

 exports.getRegisterFormController=(req,res)=>{
	res.render('students/register', { title: "Register", username: default_username,
	courseid: default_courseid});
}

exports.postRegisterFormController=async(req,res)=>{
    let username=req.body.username
    let courseid=req.body.courseid
    console.log(username)
    console.log(courseid)

    try{
        await Student.findOne({username},async(err,doc)=>{
           if(err){
               res.send('Some error occured')
               console.log(err)
           }
           else if(doc){
               console.log(doc)
               await Course.findOne({courseid},async (err,doc1)=>{
                  if(err){ 
                      res.send('Some error occured')
                      console.log(err)
                  }
                  else if(doc1){
                    await Student.findOneAndUpdate(
                       {_id:doc._id},
                       {$push:{'courseid':courseid}}
                        ,(err,doc2)=>{
                          if(err){
                              res.send('Some error occured')
                              console.log(err)
                          }
                          else if(doc2){
                            console.log(doc2)
                            res.redirect('/admin/home')
                          }

                      })
                  }
                  else{
                      res.redirect('/faculties/assign_form')
                  }
                  
               })
           }
           else{
               res.redirect('/faculties/assign_form')
           }
       })
    }
    catch(e)
    {
        console.log(e)
    }
}

exports.getDeregisterController=(req,res)=>{
    res.render('students/deregister', { title: "Deregister", username: default_username,
	courseid: default_courseid});
}


exports.postDergisterController=(req,res)=>{
    let username=req.body.username
    let courseid=req.body.courseid

    try{
        Student.findOne({username},async (err,doc)=>{
            if(err){
                res.send('Some error occured')
            }
            else if(doc){
                console.log(doc)
                await Course.findOne({courseid},async (err,doc1)=>{
                   if(err){ 
                       res.send('Some error occured')
                       console.log(err)
                   }
                   else if(doc1){
                     console.log(doc1)
                     await Student.findOneAndUpdate(
                         {_id:doc._id},
                         {$pull:{'courseid':courseid}},(err,doc2)=>{
                           if(err){
                               res.send('Some error occured')
                               console.log(err)
                           }
                           else if(doc2){
                            res.redirect('/admin/home')
                           }
                           else{
                               res.redirect('/students/deregister')
                         }
 
                       })
                   }
                   else{
                    res.redirect('/students/deregister')
                   }
                   
                })
            }
            else{
                res.redirect('/students/deregister')
            }
        })
    }
    catch(e){
        console.log(e)
    }
}


 