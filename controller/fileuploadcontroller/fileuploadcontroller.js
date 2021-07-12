const mongoose=require('mongoose')
const Grid = require('gridfs-stream');
const mongodb=require('mongodb')
const connection=require('../../database/database_config')

let gfs
connection.once('open',()=>{
    gfs=Grid(connection.db,mongoose.mongo)
    gfs.collection('uploads')
})

exports.showAllGetcontroller=(req,res)=>{
    gfs.files.find().toArray((err,files)=>{
        if(!files || files.length===0){
            res.render('fileupload',{files:false})
        }
        else{
            files.map(file=>{
                if(file.contentType==='image/jpeg' || file.contentType==='image/png'){
                    file.isImage=true
                }
                else{
                    file.isImage=false
                }
            })
            res.render('fileupload',{files:files})
        }
    })
}

// exports.fileUploadGetController=(req,res)=>{
//     res.render('fileupload',{files:false})
// }

exports.fileUploadPostController=(req,res)=>{
    res.redirect('/uploads/fileupload')
}

exports.allFilesGetController=(req,res)=>{
    gfs.files.find().toArray((err,files)=>{
        if(!files || files.length===0){
            return res.status(404).json({
                err:'NO files exist'
            })
        }
        return res.json(files)

    })
}

exports.singleFilesGetController=(req,res)=>{
    gfs.files.findOne({filename:req.params.filename},(err,file)=>{
        if(!file || file.length==0){
            return res.status(404).json({
                err:'No file exists'
            })
        }
        return res.json(file)
    })
}

exports.imageGetController=(req,res)=>{
    gfs.files.findOne({filename:req.params.filename},(err,file)=>{
        if(!file || file.length==0){
            return res.status(404).json({
                err:'No file exists'
            })
        }

        if(file.contentType=='image/jpeg' || file.contentType=='image/png'){
            const readstream=gfs.createReadStream(file.filename)
            readstream.pipe(res)
        }
        else{
            res.status(404).json({
                err:'Not an image'
            })
        }

    })
}

exports.deleteFileController=(req,res)=>{
    gfs.remove({_id:req.params.id,root:'uploads'},(err,gridStrore)=>{
        if(err){
            return res.status(400).json({err:err})
        }
        res.redirect('/uploads/fileupload')
    })
}

exports.downloadFileController=(req,res)=>{
    const  Id=req.params.id
    const id=Id.trim() 
    gfs.collection('uploads').findOne({_id:mongodb.ObjectId(id)},(err,file)=>{
        if(err){
            return res.status(400).json({err:err})
        }
       else{
        // res.set('Content-type',file.contentType)
        // res.set('Content-Dis position','attachment: filename="' + file.filename+ '"')

        let mimeType=file.contentType
        if(!mimeType){
            mimeType=mime.lookup(file.filename)
        }
        res.set({
            'Content-Type':mimeType,
            'Content-Disposition':'attachment;filename='+file.filename
        })
        const readstream=gfs.createReadStream({
           _id:id
        })

        readstream.on('error',function(err){
            console.log(err)
        })
        readstream.pipe(res)
    }
    })
    
}




