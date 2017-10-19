import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send({blank: 'blank'});
});

app.post('/registerTutor', (req, res) => {
  //Add this information to the database
});

export default app;