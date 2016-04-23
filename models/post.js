'use strict';

// This is going to have the job to interact with the data

var db = require('../config/db');
var uuid = require('uuid');

db.run('CREATE TABLE IF NOT EXISTS posts(name text, day text, time text, imgUrl text, content text, id text)');

// Read and return all the post
exports.findAll = function(callback) {
  db.all('SELECT * FROM posts', callback);
};

// Create a new post and save it to the DB
exports.create = function(post, callback) {
  if(!post) return callback('Error! No post received!');
  else if(!post.name) return callback('Post must have all attributes filled out');
  var newPost = {
    name: post.name,
    day: post.day,
    time: post.time,
    imgUrl: post.imgUrl,
    content: post.content,
    id: uuid()
  };

  db.serialize(function() {
    var stmt = db.prepare("INSERT INTO posts VALUES (?, ?, ?, ?, ?, ?)");
    stmt.run(newPost.name, newPost.day, newPost.time, newPost.imgUrl, newPost.content, newPost.id);
    stmt.finalize(function(err){
      callback(err, newPost.id);
    });
  });
};

// Find a post by id in the DB
exports.findById = function(id, callback) {
  db.all(`SELECT * FROM posts WHERE id = '${id}'`, callback);
};

// Delete a post by id in the DB

exports.deleteById = function(id, callback) {
  if(!id) return callback('Error! You must define an id!');
  db.serialize(function() {
    var stmt = db.prepare(`DELETE FROM posts WHERE id = '${id}'`);
    stmt.run();
    stmt.finalize(function(err){
      callback(err);
    });
  });

};

// Edit a post by id in the DB

exports.editById = function(id, post, callback) {
  if(!post || !id) return callback('id and post required');
  db.serialize(function() {
    var stmt = db.prepare(`UPDATE posts SET name = ?, day = ?, time = ?, imgUrl = ?, content = ? WHERE id = '${id}'`);
    stmt.run(post.name, post.day, post.time, post.imgUrl, post.content, post.id);
    stmt.finalize(function(err){
      callback(err);
    });
  });
};
