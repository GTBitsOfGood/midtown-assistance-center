import express from 'express';
import user_dao from './dao/user_dao';
import Tutor from '../models/Tutor';
const app = express();

app.get('/', (req, res) => {
    res.send({blank: 'blank'});
});

app.post('/registerTutor', (req, res) => {
    //Add this information to the database

    const newTutor = new Tutor();

    newTutor.save();

    user_dao.createTutor({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        _id: req.body._id,
        password: req.body.password,
        join_date: Date.now(),
        status: 'in review'
    }, (err, tutor_instance) => {
        if(err) console.log(err);
        else{
            console.log('YO, WE SAVED THE TUTOR.');
        }
        console.log(tutor_instance);
    }
    );


    console.log(req.body);
});
export default app;