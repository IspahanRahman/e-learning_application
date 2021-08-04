const Faculty=require('../models/faculty')
const Course=require('../models/course')
var default_faculty = {
    username: "Your LDAP ID",
    password: "Password",
    name: "Name"
  };
  
var default_username = "User Name";

var default_courseid = "Course Code";



exports.getFacultyHomePageController=(req,res)=>{
    res.render('faculties/home', { title: 'Faculty Home Page', faculty: default_faculty});
}


exports.getLogoutController=(req,res)=>{
    req.logout()
    res.redirect('/')
}

exports.getFacultyAddPageController=(req,res)=>{
    res.render('faculties/new', { title: 'Add New faculty', faculty: default_faculty});
}

exports.postFacultyAddController=async (req,res)=>{
    try{
        let faculty=new Faculty(req.body)
        await faculty.save()
        res.redirect('/admin/home')
    
    }
    catch(e){
       res.redirect('/faculties/new')
       res.status(500)
       console.log(e)
    }
}

exports.getUsernameController=(req,res)=>{
    res.render('faculties/get_username_edit', { title: "Get Username", username: default_username});
}


exports.getUserNameEditController=(req,res)=>{
    let username=req.query.username
    Faculty.findOne({username}, (err,doc)=>{
        if(err){
            res.send('Some error occured')
        } 
        else{
            if(doc){
                res.render('faculties/edit',{title:'Edit Faculty',faculty:doc})
            }
            else{
                res.render('faculties/get_username_edit')
            }
        }
     })

}

exports.postFacultyEditController=async (req,res)=>{
    let {name,username,password}=req.body
    let facultyId=req.param._id
    try{
        let faculty=await Faculty.findOne({facultyId})
        if(!faculty){
         let error=new Error('Faculty Not Found')
         res.render('faculties/edit')
         error.status=404
         throw error 
         
        }
        await Faculty.findOneAndUpdate(
            {_id:faculty._id},
            {$set:{name,username,password}},
            {new:true}
            )
            res.redirect('/admin/home')
    }
    catch(e){
        console.log(e)
        
    }
 
 }

 exports.getFacultyDeleteController=(req,res)=>{
    res.render('faculties/get_username_delete',{title:'Get Username',username:default_username})
}


exports.postFacultyDeleteController=async (req,res)=>{
   let username=req.body.username
   console.log(username)
  
   try{
       let faculty=await Faculty.findOne({username})
       console.log(faculty)
       if(!faculty){
        let error=new Error('Faculty Not Found')
        res.render('faculties/get_username_delete')
        error.status=404
        throw error 
        
       }
       await Faculty.findOneAndDelete(
           {username}
           )
        await Faculty.findOneAndUpdate(
            {$pull:{'courses':faculty._id}}
        )
           res.redirect('/admin/home')
   }
   catch(e){
       console.log(e)
       
   }

}


exports.getAssignFormController=(req,res)=>{
	res.render('faculties/assign', { title: "Assign", username: default_username,
	courseid: default_courseid});
}

exports.postAssignFormController=async(req,res)=>{
    let username=req.body.username
    let courseid=req.body.courseid
    console.log(username)
    console.log(courseid)

    try{
        await Faculty.findOne({username},async(err,doc)=>{
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
                    await Faculty.findOneAndUpdate(
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

exports.getUnassignFormController=(req,res)=>{
    res.render('faculties/unassign',{ title: "unassign", username: default_username,
	courseid: default_courseid});
}

exports.postUnassignFormController=async(req,res)=>{
    let username=req.body.username
    let courseid=req.body.courseid

    try{
        Faculty.findOne({username},async (err,doc)=>{
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
                     await Faculty.findOneAndUpdate(
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
                               res.redirect('/faculties/unassign_form')
                         }
 
                       })
                   }
                   else{
                       res.redirect('/faculties/unassign_form')
                   }
                   
                })
            }
            else{
                res.redirect('/faculties/unassign_form')
            }
        })
    }
    catch(e){
        console.log(e)
    }
}