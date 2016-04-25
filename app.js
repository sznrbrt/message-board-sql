'use strict';

const PORT = process.env.PORT || 3000;
// loading libraries
const jade = require('jade');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const favicon = require('serve-favicon');


var app = express();
app.use(favicon('./public/favicon.ico'));

// general purpose middleware
app.use( morgan('dev') );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use( express.static('public') );
app.set('view engine', 'jade');

// GET method routes for different pages
app.get('/', (req, res, next) => {
  res.render('splash');
})

app.get('/board', (req, res, next) => {
  res.render('posts');
})


app.use('/api', require('./routes/api'));

// 404 handler
app.use((req, res, next) => {
  res.status(404).send({ "error": 'Page not found! 404'});
})

// create server, and listen to PORT
app.listen(PORT, (err) => {
  console.log(err || `Server listening on port ${PORT}`);
});
