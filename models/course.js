require('dotenv').config()
var express = require('express');
var router = express.Router();

var monk = require('monk');
const db_username=process.env.DB_USERNAME
const db_password=process.env.DB_PASSWORD

const db = monk(`mongodb+srv://${db_username}:${db_password}@cluster0.d2fg3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
var course_collection = db.get('courses');

module.exports = {
// MAKE VALIDATION FUNCTIONS HERE
// Create new course in the database
create: function(course, cb) {
  course_collection.insert(course, cb);
},

// Retrieve course using courseid
getBycourseid: function(courseid, cb) {
  course_collection.findOne({courseid: courseid}, {}, cb);
},

// Update an existing course by courseid
update: function(prevcourseid, course, cb) {
  course_collection.update({courseid: prevcourseid},
  { $set: {courseid: course.courseid, coursename: course.coursename} },
  cb);
},

// Remove an existing course by courseid
remove: function(courseid, cb) {
  console.log(courseid);
  course_collection.remove({courseid: courseid}, cb);
}

};

