import express from 'express';
import mongoose from 'mongoose';
const server = express();
import ApiRouter from './api/registration.js';
import passportRoutes from './passportConfig';

const bodyParser = require('body-parser');
server.use(express.static('public'));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.set('views', './views');
server.set('view engine', 'ejs');
server.use('/api', ApiRouter);
server.use('/', passportRoutes);

server.get('/', allowIfLoggedOut, (req, res) => {
    res.redirect('/home/about');
});

server.get('/home*', allowIfLoggedOut, (req, res) => {
    res.render('home');
});

server.get('/dash*', allowIfLoggedIn, (req, res) => {
    res.render('dash');
});


function allowIfLoggedOut(req, res, next) {
    if (!req.user) {
        next();
    } else {
        res.redirect('/dash');
    }
}

function allowIfLoggedIn(req, res, next) {
    if (!req.user) {
        res.redirect('/home/login');
    } else {
        next();
    }
}

/**
 * Normalizes the port into a number
 */
function normalizePort(val) {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
    // named pipe
        return val;
    }

    if (port >= 0) {
    // port number
        return port;
    }

    return false;
}

// Set up the port
let port = normalizePort(process.env.PORT || '3000');

server.listen(port, () => {
    console.info('server is listening on the port 3000');
});