import express from 'express';
// import createTutor from '/user_dao';
const app = express();

app.get('/', (req, res) => {
  res.send({blank: 'blank'});
});

app.post('/registerTutor', (req, res) => {
  //Add this information to the database
  console.log(req.body);
});
export default app;