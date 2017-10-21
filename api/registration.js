import express from 'express';
import user_dao from './dao/user_dao';
import Tutor from '../models/Tutor';
const app = express();

app.get('/', (req, res) => {
    res.send({blank: 'blank'});
});

app.post('/registerTutor', (req, res) => {
    //Add this information to the database
    console.log(req.body);
    user_dao.checkIfUsernameIsTaken(req.body.username, function(err, resultUsername){
        if (err) {
            console.log(err);
        }
        if (!resultUsername) {
            console.log(resultUsername);
            user_dao.checkIfEmailIsTaken(req.body.email, function(err, resultEmail){
                if (err) {
                    console.log(err);
                } else {
                    console.log(resultEmail)
                    if (!resultEmail) {
                        user_dao.createTutor({
                            first_name: req.body.firstName,
                            last_name: req.body.lastName,
                            email: req.body.email,
                            _id: req.body.username,
                            password: req.body.password,
                            join_date: Date.now(),
                            status: 'in review'
                        }, function(err, user_instance){
                                if (err) {
                                    console.log(err);
                                } else {
                                    res.send(true);
                                }
                        });
                    } else {
                        res.send(false);
                    }
                }
            });
        } else {
            res.send(false);
        }
    });
});

app.post('/registerStudent', (req, res) => {
    //Add this information to the database
    console.log(req.body);
    user_dao.checkIfUsernameIsTaken(req.body.username, function(err, resultUsername){
        if (err) {
            console.log(err);
        }
        if (!resultUsername) {
            console.log(resultUsername);
            user_dao.checkIfEmailIsTaken(req.body.email, function(err, resultEmail){
                if (err) {
                    console.log(err);
                } else {
                    console.log(resultEmail)
                    if (!resultEmail) {
                        user_dao.createStudent({
                            first_name: req.body.firstName,
                            last_name: req.body.lastName,
                            email: req.body.email,
                            _id: req.body.username,
                            password: req.body.password,
                            join_date: Date.now(),
                            status: 'in review'
                        }, function(err, user_instance){
                                if (err) {
                                    console.log(err);
                                } else {
                                    res.send(true);
                                }
                        });
                    } else {
                        res.send(false);
                    }
                }
            });
        } else {
            res.send(false);
        }
    });
});
export default app;