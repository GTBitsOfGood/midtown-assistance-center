import React from 'react';
import DashSearchBar from './dashSearchBar';
import DefaultDashTutorList from './tutorSearchResult';

const tutors = [
    {
        firstName: 'Sruti',
        lastName: 'Guhathakurta',
        subjects: ['Math(K-12)', 'Science(5-7)', 'Computers(K-12)'],
        availability: {
            Monday: [],
            Tuesday: ['2:00-3:00'],
            Wednesday: [],
            Thursday: ['3:00-4:00', '5:00-6:00'],
            Friday: []
        },
        photo: '/images/default_user_img.png',
        bio: 'Hello, my name is Sruti.',
        gtemail: 'sruti@gatech.edu',
        classStanding: 'Senior',
        rating: 5,
        online:false,
        gender: 'female'
    },
    {
        firstName: 'Bob',
        lastName: 'Smith',
        subjects: ['English(K-12)', 'Science(6-8)', 'History(8-12)'],
        availability: {
            Monday: ['2:00-3:00'],
            Tuesday: [],
            Wednesday: ['6:00-7:00'],
            Thursday: ['3:00-4:00'],
            Friday: []
        },
        photo: '/images/default_user_img.png',
        bio: 'Hello, my name is Bob. I like to teach English, Science, and History. My interests are karate and underwater basket weaving. If you have any questions, please send me an email at bsmith@gatech.edu.',
        gtemail: 'bsmith3@gatech.edu',
        classStanding: 'Senior',
        rating: 3.5,
        online:true,
        gender: 'male'
    },
    {
        firstName: 'Alice',
        lastName: 'Smith',
        subjects: ['Math(K-5)', 'Science(6-8)', 'History(K-10)'],
        availability: {
            Monday: [],
            Tuesday: [],
            Wednesday: ['4:00-5:00','6:00-7:00'],
            Thursday: ['3:00-4:00'],
            Friday: ['1:00-2:00']
        },
        photo: '/images/default_user_img.png',
        bio: 'Hello, my name is Alice. I like teaching Math, Science, and History. If you have any questions, please send me an email at asmith3@gatech.edu.',
        gtemail: 'asmith3@gatech.edu',
        classStanding: 'Sophomore',
        rating: 4,
        online:true,
        gender: 'female'
    },
    {
        firstName: 'Dan',
        lastName: 'Jones',
        subjects: ['Politics(5-12)', 'Art(6-10)', 'Philosophy(K-2)'],
        availability: {
            Monday: ['1:00-2:00', '5:30-6:30'],
            Tuesday: [],
            Wednesday: ['4:00-5:00','6:00-7:00'],
            Thursday: ['3:00-4:00'],
            Friday: []
        },
        photo: '/images/default_user_img.png',
        bio: 'Hello, my name is Dan.',
        gtemail: 'djones3@gatech.edu',
        classStanding: 'Junior',
        rating: 1,
        online:true,
        gender: 'male'
    }
]

class DefaultDash extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
        <div>
            <div className="col-md-12 atlanta">
                <DashSearchBar/>
            </div>
            <DefaultDashTutorList data={tutors} />
        </div>
        )
    }
}

export default DefaultDash;