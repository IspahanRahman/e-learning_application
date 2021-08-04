const Exam=require('../models/exam')
const Course=require('../models/course')
const Faculty=require('../models/faculty')


exports.getNewExamController=(req,res)=>{
    let default_exam = {
        exam_name: "Exam Name",
        exam_code: "Exam Code",
        duration_hours:1,
        duration_minutes:0,
        course_code: "Course Code",
        faculty_username:"Faculty User Name"
      };
      res.render('exams/new', { title: 'Make New Exam', exam: default_exam})
}


exports.postNewExamController=async (req,res)=>{
 let {
  exam_name,
  exam_code,
  duration_hours,
  duration_minutes,
  course_code
 }=req.body

 let exam=new Exam({
   exam_name,
   exam_code,
   duration_hours,
   duration_minutes,
   course_code,
   question:[]
 })
  try{
    await exam.save()
    // await Exam.findOneAndUpdate(
    //   {course_code:course_code},
    //   {$push:{'exam':createdexam._id}}  
    // )
    res.render('exams/question_list',{exam:exam})
  }catch(e){
    res.redirect('/make_exam/new')
    console.log(e)
  }
  
}


exports.getQuestionListController=(req,res)=> {
//  let exam_code=req.query.exam_code
//  console.log(exam_code)
//   Exam.findOne({exam_code},function(err,docs){
//       if(err)
//       res.send("some error occured");
//       else
      res.render('exams/question_list', {exam: docs});
  // });
}

exports.getAddQuestionController=(req,res)=>{
  let exam_code=req.body.exam_code
  let default_question_full = {
	  question: "Question",
	  optionA: "option A",
	  optionB: "option B",
	  optionC: "option C",
	  optionD: "option D",
	  key: "Key"
	};
	res.render('exams/new_question', { title: 'Add New Question', question_full: default_question_full, 
	exam_code: exam_code});
}

exports.postAddQuestionController=(req,res)=>{
  let exam_code=req.body.exam_code
  let default_question_full={
    question: "Question",
	  optionA: "option A",
	  optionB: "option B",
	  optionC: "option C",
	  optionD: "option D",
	  key: "Key"
  }
  res.render('exams/new_question',{title:'Add New Question',question_full:default_question_full,
exam_code:exam_code})
}

exports.postCreateQuestionController=async(req,res)=>{
  let question_full={
	  question: req.body.question,
	  optionA: req.body.optionA,
	  optionB: req.body.optionB,
	  optionC: req.body.optionC,
	  optionD: req.body.optionD,
	  key: req.body.key
	}
  
  let exam_code=req.body.exam_code
  let examId=req.param._id

  try{
    let exam=await Exam.findOne({exam_code})
    if(!exam){
      let error=new Error('Exam Not Found')
      error.status=404
      throw error 
    }
    await Exam.findOneAndUpdate(
      {exam_code:exam.exam_code},
      {$push:{'question':question_full}}
      ,(err,docs)=>{
        if(err){
          res.send('Some error occured')
        }
        else{
          console.log(docs)
          res.render('exams/question_list',{exam:docs})
        }
      })
  }catch(e){
    console.log(e)
  }
}


exports.getSubmitController=(req,res)=>{
  res.send('exam Successfully created')
}

exports.getListController=async (req,res)=>{
  try{
    await Exam.find((req.query.exam_code),(err,docs)=>{
      if (err){
        console.log(err)
      }
      else if (docs){
        res.json(docs)
      }
    })
}catch(e){
    console.log(e)
}

}
