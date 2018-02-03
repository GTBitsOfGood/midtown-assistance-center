import React from 'react';
import ApproveTutors from './ApproveTutors.jsx';
import TutorStatistics from './TutorStatistics.jsx';
import Members from './Members.jsx';
import { Provider } from 'react-redux';
import store from '../redux/store.js';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

const tutors = [
    {
        first_name: 'Sruti',
        last_name: 'Guhathakurta',
        subjects: [{subject:'Math', start_grade:6, end_grade:12},{subject:'Science', start_grade:5, end_grade:7},{subject:'Computer Science', start_grade:6, end_grade:12}],
        availability: {
            Monday: [{start_time:'2:00', end_time:'3:00'}],
            Tuesday: [{start_time:'6:00', end_time:'7:00'}],
            Wednesday: [],
            Thursday: [{start_time:'4:00', end_time:'5:00'}],
            Friday: [],
            Saturday: [],
            Sunday: []
        },
        profile_picture: '/images/default_user_img.png',
        bio: 'Hello, my name is Sruti.',
        email: 'sruti@gatech.edu',
        class_standing: 'Senior',
        rating: 5,
        online: false,
        gender: 'female',
        approved:true
    },
    {
        first_name: 'Bob',
        last_name: 'Smith',
        subjects: [{subject:'English', start_grade:10, end_grade:12},{subject:'Science', start_grade:5, end_grade:8},{subject:'History', start_grade:8, end_grade:12}],
        availability: {
            Monday: [{start_time:'2:00', end_time:'3:00'}],
            Tuesday: [],
            Wednesday: [{start_time:'6:00', end_time:'7:00'}],
            Thursday: [{start_time:'4:00', end_time:'5:00'}],
            Friday: [],
            Saturday: [],
            Sunday: []
        },
        profile_picture: '/images/default_user_img.png',
        bio: 'Hello, my name is Bob. I like to teach English, Science, and History. My interests are karate and underwater basket weaving. If you have any questions, please send me an email at bsmith@gatech.edu.',
        email: 'bsmith3@gatech.edu',
        class_standing: 'Senior',
        rating: 3.5,
        online:true,
        gender: 'male',
        approved:true
    },
    {
        first_name: 'Alice',
        last_name: 'Smith',
        subjects: [{subject:'Math', start_grade:9, end_grade:11},{subject:'Science', start_grade:6, end_grade:12},{subject:'History', start_grade:9, end_grade:12}],
        availability: {
            Monday: [{start_time:'2:00', end_time:'3:00'}],
            Tuesday: [],
            Wednesday: [{start_time:'3:00', end_time:'4:00'}, {start_time:'5:00', end_time:'6:00'}],
            Thursday: [],
            Friday: [{start_time:'4:00', end_time:'5:00'}],
            Saturday: [],
            Sunday: []
        },
        profile_picture: '/images/default_user_img.png',
        bio: 'Hello, my name is Alice. I like teaching Math, Science, and History. If you have any questions, please send me an email at asmith3@gatech.edu.',
        email: 'asmith3@gatech.edu',
        class_standing: 'Sophomore',
        rating: 4,
        online:true,
        gender:'female',
        approved:true
    },
    {
        first_name: 'Dan',
        last_name: 'Jones',
        subjects: [{subject:'Politics', start_grade:6, end_grade:12},{subject:'Art', start_grade:5, end_grade:7},{subject:'Philosophy', start_grade:6, end_grade:12}],
        availability: {
            Monday: [{start_time:'2:00', end_time:'3:00'}],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [{start_time:'2:00', end_time:'3:00'},{start_time:'4:00', end_time:'5:00'}],
            Saturday: [],
            Sunday: []
        },
        profile_picture: '/images/default_user_img.png',
        bio: 'Hello, my name is Dan.',
        email: 'djones3@gatech.edu',
        class_standing: 'Junior',
        rating: 1,
        online:true,
        gender: 'male',
        approved:true
    },
    {
        first_name: 'John',
        last_name: 'Doe',
        subjects: [{subject:'Architecture', start_grade:7, end_grade:11},{subject:'Computer Science', start_grade:8, end_grade:9},{subject:'Biology', start_grade:8, end_grade:12}],
        availability: {
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [{start_time:'12:00', end_time:'1:00'},{start_time:'2:00', end_time:'3:00'},{start_time:'4:00', end_time:'5:00'}],
            Saturday: [],
            Sunday: []
        },
        profile_picture: '/images/default_user_img.png',
        bio: 'Hello, my name is John. Please ask me for help, I am smart.',
        email: 'jdoe6@gatech.edu',
        class_standing: 'Freshman',
        rating: 2.5,
        online:false,
        gender: 'male',
        approved:true
    },
    {
        first_name: 'Donald',
        last_name: 'Trump',
        email: 'dtrump1@gatech.edu',
        online:false,
        gender: 'male',
        approved:false
    },
    {
        first_name: 'Barack',
        last_name: 'Obama',
        email: 'bobama6@gatech.edu',
        online:false,
        gender: 'male',
        approved:false
    },
    {
        first_name: 'Hillary',
        last_name: 'Clinton',
        email: 'hclinton3@gatech.edu',
        online:true,
        gender: 'female',
        approved:false
    },
    {
         first_name: 'Mitt',
         last_name: 'Romney',
         email: 'mromney3@gatech.edu',
         online:false,
         gender: 'male',
         approved:false
     }
];

class DefaultAdminDash extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const notApprovedTutors = tutors.filter((obj) => {
                                return !(obj.approved);
                            });
    return (
    <div className="col-md-12 tutor-dash-wrapper">
      <ApproveTutors data={notApprovedTutors}></ApproveTutors>
      <TutorStatistics></TutorStatistics>
    </div>
    );
  }
}

export default DefaultAdminDash;

ReactDOM.render(
    <Provider store={store}>
        <DefaultAdminDash/>
    </Provider>,
    document.getElementById('root')
);