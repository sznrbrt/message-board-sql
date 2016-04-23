'use strict';

var express = require('express');
var router = express.Router();

// api router
// root: /api

// /api/posts
router.use('/posts', require('./posts'));

module.exports = router;
