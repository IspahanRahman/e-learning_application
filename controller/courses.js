const Course=require('../models/course')

var default_courseid = "CourseID";
var default_course={
	courseid: "CourseID",
    coursename: "Course Name"
};

exports.getCoursePageController=(req,res)=>{
    res.render('courses/new',{title:'Add New Course',course:default_course})
}

exports.postCourseController=async (req,res,next)=>{
    try{
        let course=new Course(req.body)
        await course.save()
        res.redirect('/admin/home')
    
    }
    catch(e){
       res.redirect('/courses/new')
       res.status(500)
       console.log(e)
    }
     
}

exports.getCourseEditController=(req,res)=>{
    res.render('courses/get_courseid_edit',{title:'Get course Id', courseid:default_courseid})
}

exports.getCourseEditPageController=(req,res)=>{
    let courseid=req.query.courseid
    Course.findOne({courseid}, (err,doc)=>{
       if(err){
           res.send('Some error occured')
       } 
       else{
           if(doc){
               res.render('courses/edit',{title:'Edit Course',course:doc})
           }
           else{
               res.render('courses/get_courseid_edit',{title:'Get course Id'})
           }
       }
    })

}

exports.postCourseEditController=async (req,res)=>{
   let {coursename,courseid}=req.body
   let courseId=req.param._id
   console.log(courseId)

   try{
       let course=await Course.findOne({courseId})
       if(!course){
        let error=new Error('Course Not Found')
        res.render('courses/edit')
        error.status=404
        throw error 
        
       }
       await Course.findOneAndUpdate(
           {_id:course._id},
           {$set:{coursename,courseid}},
           {new:true}
           )
           res.redirect('/admin/home')
   }
   catch(e){
       console.log(e)
       
   }


}

exports.getDeleteController=(req,res)=>{
    const default_courseid='User Name'
    res.render('courses/get_courseid_delete',{title:'Get Course Id',course:default_courseid})
}

exports.postDeleteController=async (req,res)=>{
   let courseid=req.body.courseid
   console.log(courseid)
  
   try{
       let course=await Course.findOne({courseid})
       console.log(course)
       if(!course){
        let error=new Error('Course Not Found')
        res.render('courses/get_courseid_delete')
        error.status=404
        throw error 
        
       }
       await Course.findOneAndDelete(
           {courseid}
           )
        await Course.findOneAndUpdate(
            {$pull:{'courses':course._id}}
        )
           res.redirect('/admin/home')
   }
   catch(e){
       console.log(e)
       
   }
}