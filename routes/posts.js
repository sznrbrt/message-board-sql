'use strict';

var express = require('express');
var router = express.Router();

var Post = require('../models/post');

// GET /api/posts
router.get('/', (req, res, next) => {
    // get all posts
    Post.findAll((err, posts) => {
        if(err) return res.status(400).send(err);
        res.json(posts);
    });
});

// POST /api/posts
router.post('/', (req, res, next) => {
    //create a new post
    Post.create(req.body, (err, id) => {
      if(err) return res.status(400).send(err);
      res.send(id);
    });
});

// GET /api/posts
router.get('/:id', (req, res, next) => {
    //get one post by UUID
    var id = req.params.id;
    Post.findById(id, (err, post) => {
      if(err) {return res.status(400).send(err)}
      res.send(post);
    });
});

// DELETE /api/posts
router.delete('/:id', (req, res, next) => {
    //delete one post by ID
    var id = req.params.id;
    Post.deleteById(id, (err) => {
      if(err) return res.status(400).send(err);
      res.send('You have deleted the post!');
    })
})

// EDIT /api/posts
router.put('/:id', (req, res, next) => {
    //delete one post by ID
    var id = req.params.id;
    Post.editById(id, req.body, (err, post) => {
      if(err) return res.status(400).send(err);
      res.send('You have edited the post!');
    })
})

module.exports = router;
