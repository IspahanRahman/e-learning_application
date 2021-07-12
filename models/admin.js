require('dotenv').config()
const express = require('express');
const router = express.Router();

const monk = require('monk');
const db_username=process.env.DB_USERNAME
const db_password=process.env.DB_PASSWORD

const MONGODB_URI=`mongodb+srv://${db_username}:${db_password}@cluster0.d2fg3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const db = monk('localhost:27017/examdb');
const admin_collection = db.get('admin');

module.exports = {
    
findByUserName: function(username, cb) {
  admin_collection.findOne({username: username}, cb);
},

};

