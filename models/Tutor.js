const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true}, //THIS IS FOR THEIR GEORGIA TECH EMAIL
    gmail: {type: String, required: true},
    _id: {type: String, required: true},
    password: {type: String, required: true},
    join_date: {type: Date, default: Date.now},
    status: {type: String, default: 'in review'},
    profile_picture: {type: String, default: ''},
    bio: {type: String},
    resume: {type: String, default: ''},
    gpa: {type: Number},
    transcript: {type: String, default: ''},
    rating: {type: Number, default: 0},
    num_ratings: {type: Number, default: 0},
    subjects: {type:
      [
          {
              subject: {type:String},
              start_grade: {type:Number},
              end_grade: {type:Number}
          }
      ],
    default: []
    },
    availability: {type:
      {
          Monday: {type:
          [
              {
                  start_time: {type:String},
                  end_time: {type:String}
              }
          ],
          default: []
          },
          Tuesday: {type:
          [
              {
                  start_time: {type:String},
                  end_time: {type:String}
              }
          ],
          default: []
          },
          Wednesday: {type:
          [
              {
                  start_time: {type:String},
                  end_time: {type:String}
              }
          ],
          default: []
          },
          Thursday: {type:
          [
              {
                  start_time: {type:String},
                  end_time: {type:String}
              }
          ],
          default: []
          },
          Friday: {type:
          [
              {
                  start_time: {type:String},
                  end_time: {type:String}
              }
          ],
          default: []
          },
          Saturday: {type:
          [
              {
                  start_time: {type:String},
                  end_time: {type:String}
              }
          ],
          default: []
          },
          Sunday: {type:
          [
              {
                  start_time: {type:String},
                  end_time: {type:String}
              }
          ],
          default: []
          },
          default: {}
      }},
    gender: {type:String, required: false},
    online: {type:Boolean, required: false},
    approved: {type:Boolean, default: true},
    calendarId: {type: String, required: false},
    tutoringEventId: {type: String, required: false}
});

schema.virtual('username').get(function() {
    return this._id;
});

module.exports = mongoose.model('Tutor', schema);
