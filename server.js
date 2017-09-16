import express from 'express';
const server = express();

server.set('views', './views');

server.get('/', (req, res) => {
	res.send('hello');
});

server.listen(3000, () => {
	console.log('server is listening on the port 3000');
});