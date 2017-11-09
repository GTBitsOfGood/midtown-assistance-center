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
                                    res.send({
                                        success: true,
                                        error_message: null
                                    });
                                }
                        });
                    } else {
                        res.send({
                            success: false,
                            error_message: "Email already exists"
                        });
                    }
                }
            });
        } else {
            res.send({
                success: false,
                error_message: "Username already exists"
            });
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
                    console.log(resultEmail);
                    if (!resultEmail) {
                        user_dao.createStudent({
                            first_name: req.body.firstName,
                            last_name: req.body.lastName,
                            email: req.body.email,
                            _id: req.body.username,
                            password: req.body.password,
                            join_date: Date.now(),
                            classroom: req.body.access_code,
                            grade_level: req.body.grade_level
                        }, function(err, user_instance){
                                if (err) {
                                    console.log(err);
                                } else {
                                    res.send({
                                        success: true,
                                        error_message: null,
                                    });
                                }
                        });
                    } else {
                        res.json({
                            success: false,
                            error_message: "Email already exists"
                        });
                    }
                }
            });
        } else {
            res.json({
                success: false,
                error_message: "Username already exists"
            });
        }
    });
});
export default app;