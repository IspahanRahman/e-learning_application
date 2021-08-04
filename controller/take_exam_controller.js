const Exam=require('../models/exam')
const Student=require('../models/student')
const Response=require('../models/response')

exports.getExamEntryPageController=(req,res)=>{
    let default_name={
        exam_code:'exam_code',
        student_username:'student username'
    }
    res.render('exams/take_exam_code_entry', {title: "Enter Exam Code" ,exam:default_name});

}

exports.postExamEntryPageController=async(req,res)=>{
    let exam_code=req.body.exam_code
    let username=req.body.username

    try{
        Exam.findOne({exam_code},(err,doc1)=>{
            if(err)
            res.send('Some error occured')
            else if(doc1){
                // console.log(doc1)
                let course_code=doc1.course_code
                Student.findOne({username},(err,doc)=>{
                    if(err){
                        res.send('Some error occured')
                    } 
                    else if(doc){
                        console.log(doc1)
                        res.render('exams/take_exam',{title:'Take Exam',exam_code:exam_code,username:username,exam:doc1})
                       
                    }
                    else{
                        res.redirect('/take_exam')
                    }
                })
            }
            else{
                res.redirect('/take_exam')
            }
            
        })
    }catch(e){
        console.log(e)
    }

}

exports.getListController=(req,res)=>{
    Exam.findOne(req.query.exam_code,(err,docs)=>{
        if(err){
            res.send("some error occured")
        }
        else{
            res.json(docs)
        }
    })
}


exports.postSubmitController=(req,res)=>{ 
    let username=req.body.username
    let exam_code=req.body.exam_code

    let object=req.body

    let response=[]

    for (let key in object){
        response.push(object[key])
    }
    response.pop()
    response.pop()

    Exam.findOne({exam_code},(err,doc1)=>{
        if(err){
            res.send('some error occured')
        }
        else if(doc1){
            Student.findOne({username},(err,doc2)=>{
                if(err){
                    res.send('some error occured')
                }
                else if(doc2){
                    let temp_response={
                        username:username,
                        exam_code:exam_code,
                        response:response
                    }
                    let result=  Response.insertMany(temp_response)
                    if(!result){
                        console.log('Some error occured')
                    }
                    else if (result){
                        res.render('exams/exam_submit',{title:'Response Submitted Successfully',response:response,username:username,exam_code:exam_code})
                    }
                    else{
                        res.redirect('/take_exam')
                    }
                    
                }
                else{
                    res.redirect('/take_exam')
                }
            })
        }
        else{
            res.redirect('/take_exam')
        }
    })
}

exports.getPerformanceController=(req,res)=>{
    res.render('exams/view_performance_code_entry',{title:"Enter Exam Code",username:req.user.username})
}

exports.postPerformaceController=(req,res)=>{
    let username=req.body.username;
    let exam_code=req.body.exam_code; 

    Exam.findOne({exam_code}, function(err,doc1) 
    {
        if(err)
            res.send("Some error occured");
        else if(doc1)
            {
                Student.findOne({username}, function(err,doc2){
                    if(err)
                    res.send("some error occured");
                    else if(doc2)
                    {
                        var exam_obj = doc1.question;
                        Exam.getResponseByExamCode(exam_code, username, function(err, docs){
                            if(err)
                            res.send("some error occured");
                            else
                            {
                                var response_obj = docs.response;
                                var total_questions = 0;
                                var attempted = 0;
                                var correct = 0;
                                for(var temp in exam_obj) {
                                    if(response_obj[total_questions] != ' ')
                                    attempted++;
                                    if(exam_obj[total_questions].key == response_obj[total_questions])
                                    correct++;
                                    total_questions++;
                                }
                                res.render('exams/performance',{title: 'Result', total_questions: total_questions, attempted: attempted, correct: correct});
                            }
                        });
                    }
                })}
                else
                {
                    res.render('exams/view_performance_code_entry', {title: "Enter Exam Code", username: req.user.username});
                }                       
            })
    }