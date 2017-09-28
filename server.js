import express from 'express';
import ApiRouter from './api/index.js';
import passportRoutes from './passportConfig';
const bodyParser = require('body-parser');
const server = express();
server.use(express.static('public'));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.set('views', './views');
server.set('view engine', 'ejs');
server.use('/api', ApiRouter);
server.use('/', passportRoutes);

server.get('/', (req, res) => {
	res.redirect('/home');
});

server.get('/home', (req, res) => {
	res.render('home');
});

server.get('/dash', (req, res) => {
	res.render('dash');
});

server.listen(3000, () => {
	console.log('server is listening on the port 3000');
});