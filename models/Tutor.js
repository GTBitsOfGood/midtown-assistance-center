const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    _id: {type: String, required: true},
    password: {type: String, required: true},
    join_date: {type: Date, default: Date.now, required: true},
    status: {type: String, default: 'in review', required: true},
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
      required: true,
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
          required: true,
          default: []
        },
        Tuesday: {type:
          [
            {
                start_time: {type:String},
                end_time: {type:String}
            }
          ],
          required: true,
          default: []
        },
        Wednesday: {type:
          [
            {
                start_time: {type:String},
                end_time: {type:String}
            }
          ],
          required: true,
          default: []
        },
        Thursday: {type:
          [
            {
                start_time: {type:String},
                end_time: {type:String}
            }
          ],
          required: true,
          default: []
        },
        Friday: {type:
          [
            {
                start_time: {type:String},
                end_time: {type:String}
            }
          ],
          required: true,
          default: []
        },
        Saturday: {type:
          [
            {
                start_time: {type:String},
                end_time: {type:String}
            }
          ],
          required: true,
          default: []
        },
        Sunday: {type:
          [
            {
                start_time: {type:String},
                end_time: {type:String}
            }
          ],
          required: true,
          default: []
        },
    }},
    gender: {type:String, required: true},
    online: {type:Boolean, required: true},
    approved: {type:Boolean, required: true},
    calendarId: {type: String, required: false},
    hangoutsLink: {type: String, required: false}
});

schema.virtual('username').get(function() {
    return this._id;
});

module.exports = mongoose.model('Tutor', schema);
