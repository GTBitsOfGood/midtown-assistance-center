import express from 'express';
import data_access from './data_access'
const app = express();

app.get('/onlineTutors', (req, res) => {
    console.log(req.query);
    function onTutorsFound(err, tutors) {
      if (err) {
        console.error(err);
        return res.send([]);
      }
      return res.send(tutors);
    }

    data_access.users.getAllAvailableTutors(req.query.subject, req.query.availability, onTutorsFound);
});

app.post('/registerTutor', (req, res) => {
    //Add this information to the database
    console.log(req.body);
    data_access.users.checkIfUsernameIsTaken(req.body.username, function(err, resultUsername){
        if (err) {
            console.log(err);
        }
        if (!resultUsername) {
            console.log(resultUsername);
            data_access.users.checkIfEmailIsTaken(req.body.email, function(err, resultEmail){
                if (err) {
                    console.log(err);
                } else {
                    console.log(resultEmail);
                    if (!resultEmail) {
                        data_access.users.createTutor({
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
                            error_message: 'Email already exists'
                        });
                    }
                }
            });
        } else {
            res.send({
                success: false,
                error_message: 'Username already exists'
            });
        }
    });
});

app.post('/registerStudent', (req, res) => {
    //Add this information to the database
    console.log(req.body);
    data_access.users.checkIfUsernameIsTaken(req.body.username, function(err, resultUsername){
        if (err) {
            console.log(err);
        }
        if (!resultUsername) {
            console.log(resultUsername);
            data_access.users.checkIfEmailIsTaken(req.body.email, function(err, resultEmail){
                if (err) {
                    console.log(err);
                } else {
                    console.log(resultEmail);
                    if (!resultEmail) {
                        data_access.users.createStudent({
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
                            error_message: 'Email already exists'
                        });
                    }
                }
            });
        } else {
            res.json({
                success: false,
                error_message: 'Username already exists'
            });
        }
    });
});

app.patch('/student', (req, res) => {
    data_access.users.saveStudent(req.body, function(err, resultStudent) {
        if (err) {
          console.error(err);
          return res.json({
              success: false,
              error_message: "Update failed"
          });
        }

        res.json({
          success: true,
          error_message: null
        })
    });
});

app.patch('/tutor', (req, res) => {
  data_access.users.saveTutor(req.body, function(err, resultStudent) {
    if (err) {
      console.error(err);
      return res.json({
        success: false,
        error_message: "Update failed"
      });
    }

    res.json({
      success: true,
      error_message: null
    })
  });
});

app.patch('/admin', (req, res) => {
  res.json({
    success: false,
    error_message: "Update failed because admin dao does not exist yet"
  });
});

export default app;