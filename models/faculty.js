require('dotenv').config()
var express = require('express');
var router = express.Router();

var monk = require('monk');
const db_username=process.env.DB_USERNAME
const db_password=process.env.DB_PASSWORD

const db = monk(`mongodb+srv://${db_username}:${db_password}@cluster0.d2fg3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
var faculty_collection = db.get('faculties');

module.exports = {
// MAKE VALIDATION FUNCTIONS HERE
// Create new student in the database
create: function(faculty, cb) {
  faculty_collection.insert(faculty, cb);
},

// Retrieve faculty using username
getByUserName: function(username, cb) {
  faculty_collection.findOne({username: username}, {}, cb);
},

findByUserName: function(username, cb) {
  faculty_collection.findOne({username: username}, {}, cb);
},

// Update an existing faculty by username
update: function(prevusername, faculty, cb) {
  faculty_collection.update({username: prevusername},
  { $set: {username: faculty.username, password: faculty.password,
  name: faculty.name} },
  cb);
},

// Remove an existing faculty by username
remove: function(username, cb) {
  faculty_collection.remove({username: username}, cb);
},

// Assign faculty to a course by username and course ID
assign: function(username, course_code, cb) {
faculty_collection.update(
   { username: username },
   { $addToSet: { course_list: { $each: [ course_code] } } }, cb);
},

unassign: function(username, course_code, cb) 
{
faculty_collection.update(
	{username: username},
	{ $pull: {  course_list: course_code } },cb);
},

getBycourseid: function(username,course_code, cb) {
  faculty_collection.findOne({username: username, course_list :course_code}, {}, cb);
}

};