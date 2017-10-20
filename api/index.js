import express from 'express';
import Tutor from '../models/Tutor';
const app = express();

app.get('/', (req, res) => {
    res.send({blank: 'blank'});
});

app.post('/registerTutor', (req, res) => {
    //Add this information to the database
    const newTutor = new Tutor(req.body);
    newTutor.save();
    console.log(req.body);
});
export default app;