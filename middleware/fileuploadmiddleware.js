const crypto=require('crypto')
const { Store } = require('express-session');
const {GridFsStorage} = require('multer-gridfs-storage');
const path=require('path')
const db_username=process.env.DB_USERNAME
const db_password=process.env.DB_PASSWORD

const MONGODB_URI=`mongodb+srv://${db_username}:${db_password}@cluster0.d2fg3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`


// Create storage engine
 const storage = new GridFsStorage({
    url: MONGODB_URI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });

  module.exports=storage