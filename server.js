import express from 'express';
import ApiRouter from './api/api.js';
import passportRoutes from './passportConfig';
import calendar_api from './api/calendar_api';

let bodyParser = require('body-parser');
let Raven = require('raven');
Raven.config(
    'https://c552aa8ccf2c40cdb2050093dfcd3e8e:734ce4f24fd54361bcc2943b47c28149@sentry.io/243818'
).install();
const http = require('http');
const socketio = require('socket.io', {
    origins: ':',
    agent: false,
    log: false
});
const server = express();
const http_server = http.createServer(server);
const io = socketio(http_server);

server.use(express.static('public'));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.set('views', './views');
server.set('view engine', 'ejs');
server.use('/api', ApiRouter);
server.use('/', passportRoutes);
server.use('/calendar', calendar_api);

server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept-Type'
    );
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

io.on('connection', socket => {
    console.log('User connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
        socket.disconnect();
    });

    socket.on('tutor-login', () => {
        console.log('tutor just logged in...');
        io.emit('update-tutors');
    });

    socket.on('tutor-logout', () => {
        console.log('tutor just logged out...');
        io.emit('update-tutors');
    });

    socket.on('student-join', data => {
        console.log(data);
        console.log('student joined session');
        io.emit('session-update-' + data.session, { user: data.student });
    });

    socket.on('student-request', data => {
        console.log(data);
        console.log('student requested to join session');
        io.emit('session-update-' + data.session, data);
    });

    socket.on('tutor-approve', data => {
        console.log(data);
        console.log('tutor approved student in session');
        io.emit('student-session-update-' + data.session, { approved: true });
    });

    socket.on('tutor-deny', data => {
        console.log(data);
        console.log('tutor denied student in session');
        io.emit('student-session-update-' + data.session, {
            approved: false,
            reason: data.reason
        });
    });

    socket.on('error', function() {
        console.log('socket error');
        socket.disconnect();
    });
});

server.get('/', allowIfLoggedOut, (req, res) => {
    res.redirect('/home/about');
});

server.get('/home*', allowIfLoggedOut, (req, res) => {
    res.render('home');
});

server.get('/dash*', allowIfLoggedIn, (req, res) => {
    res.render('dash');
});

server.get('/admin*', allowIfLoggedOut, (req, res) => {
    res.render('admin');
});

function allowIfLoggedOut(req, res, next) {
    if (!req.user) {
        next();
    } else {
        //res.redirect('/dash');
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

http_server.listen(port, () => {
    console.info('server is listening on the port ' + port);
});
