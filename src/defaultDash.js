import React from 'react';
import DashSearchBar from './dashSearchBar';
import DefaultDashTutorList from './tutorSearchResult';

const tutors = [
    {
        firstName: 'Sruti',
        lastName: 'Guhathakurta',
        subjects: ['Math', 'Science', 'Computers'],
        availability: {
            Monday: [],
            Tuesday: ['2:00-3:00'],
            Wednesday: [],
            Thursday: ['3:00-4:00', '5:00-6:00'],
            Friday: []
        },
        photo: '/images/default_user_img.png',
        bio: 'Hello, my name is Sruti.',
        gtemail: 'sguhathakurta6@gatech.edu',
        classStanding: 'Senior',
        rating: 5,
        online:false
    },
    {
        firstName: 'Bob',
        lastName: 'Smith',
        subjects: ['English', 'Science', 'History'],
        availability: {
            Monday: ['2:00-3:00'],
            Tuesday: [],
            Wednesday: ['6:00-7:00'],
            Thursday: ['3:00-4:00'],
            Friday: []
        },
        photo: '/images/default_user_img.png',
        bio: 'Hello, my name is Bob.',
        gtemail: 'bsmith3@gatech.edu',
        classStanding: 'Senior',
        rating: 3.5,
        online:true
    },
    {
        firstName: 'Alice',
        lastName: 'Smith',
        subjects: ['Math', 'Science', 'History'],
        availability: {
            Monday: [],
            Tuesday: [],
            Wednesday: ['4:00-5:00','6:00-7:00'],
            Thursday: ['3:00-4:00'],
            Friday: ['1:00-2:00']
        },
        photo: '/images/default_user_img.png',
        bio: 'Hello, my name is Alice.',
        gtemail: 'asmith3@gatech.edu',
        classStanding: 'Sophomore',
        rating: 4,
        online:true
    },
    {
        firstName: 'Dan',
        lastName: 'Jones',
        subjects: ['Politics', 'Art', 'Philosophy'],
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
        online:true
    }
]

class DefaultDash extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
        <div>
            <DashSearchBar/>
            <DefaultDashTutorList data={tutors} />
        </div>
        )
    }
}

export default DefaultDash;