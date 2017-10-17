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
        photo: 'images/default_tutor_img.png',
        bio: 'Hello, my name is Sruti.',
        gtemail: 'sguhathakurta6@gatech.edu',
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
        photo: 'images/default_tutor_img.png',
        bio: 'Hello, my name is Bob.',
        gtemail: 'bsmith3@gatech.edu',
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
        photo: 'images/default_tutor_img.png',
        bio: 'Hello, my name is Alice.',
        gtemail: 'asmith3@gatech.edu',
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