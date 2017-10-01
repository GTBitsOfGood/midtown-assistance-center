import express from 'express';
import mongoose from 'mongoose';
const server = express();
import ApiRouter from './api/index.js';
import passportRoutes from './passportConfig';
const bodyParser = require('body-parser');
server.use(express.static('public'));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.set('views', './views');
server.set('view engine', 'ejs');
server.use('/api', ApiRouter);
server.use('/', passportRoutes);

server.get('/', allowIfLoggedIn, (req, res) => {
  res.redirect('/home');
});

server.get('/home', allowIfLoggedIn, (req, res) => {
  res.render('home');
});

server.get('/dash', allowIfLoggedOut, (req, res) => {
  res.render('dash');
});

function allowIfLoggedIn(req, res, next) {
  if (!req.user) {
    next();
  } else {
    res.redirect('/dash');
  }
}

function allowIfLoggedOut(req, res, next) {
  if (!req.user) {
    res.redirect('/home');
  } else {
    next();
  }
}

server.listen(3000, () => {
  console.info('server is listening on the port 3000');
});