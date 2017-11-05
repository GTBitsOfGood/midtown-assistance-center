import React from 'react';
import DashSearchBar from './DashSearchBar.jsx';
import DefaultDashTutorList from './TutorSearchList.jsx';

const tutors = [
    {
        first_name: 'Sruti',
        last_name: 'Guhathakurta',
        subjects: [{subject:'Math', start_grade:6, end_grade:12},{subject:'Science', start_grade:5, end_grade:7},{subject:'Computers', start_grade:6, end_grade:12}],
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
        online:false,
        gender: 'female'
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
        gender: 'male'
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
        gender:'female'
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
        gender: 'male'
    }
];

class DefaultDash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchType:"online",
            displayTutors: this.getDisplayTutors("online"),
            searchTime:"ASAP",
            searchSubject:null
        }
        this.handleSearchClicked = this.handleSearchClicked.bind(this);
        this.getDisplayTutors = this.getDisplayTutors.bind(this);

    }


    handleSearchClicked(subject, time) {
        this.setState({searchType:"searchResults"});
        this.setState({displayTutors: this.getDisplayTutors("searchResults", subject, time)});
        this.setState({searchSubject:subject});
        this.setState({searchTime:time});
        this.forceUpdate();
    }

    getDisplayTutors(searchType, subject, time) {
        var newTutorsList;
        if (searchType === "online") {
            newTutorsList = tutors.filter((obj, num) => {
                return obj.online;
            });
        } else {
            alert(subject);
            newTutorsList = tutors.filter((obj, num) => {
                return obj.subjects.reduce((acc, curr) => {
                    return curr.subject === subject ? acc + 1 : acc;
                }, 0);
            });
        }

        console.log(newTutorsList);
        return newTutorsList;
    }

    render() {

        return (
            <div>
                <div className="col-md-12 atlanta">
                    <DashSearchBar handleSearchClicked={this.handleSearchClicked}/>
                </div>
                <DefaultDashTutorList subject={this.state.searchSubject} time={this.state.searchTime} data={this.state.displayTutors} searchType={this.state.searchType}/>
            </div>
        );
    }
}

export default DefaultDash;