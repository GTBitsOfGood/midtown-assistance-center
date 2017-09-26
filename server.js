import express from 'express';
const server = express();

server.set('views', './views');
server.set('view engine', 'ejs');
server.use(express.static('public'));

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