import React from 'react';



class TutorSearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.data.firstName ? this.props.data.firstName : 'NoName',
            availability: this.props.data.availability ? this.props.data.availability : '',
            photo: this.props.data.photo ? this.props.data.photo : '',
            bio: this.props.data.bio ? this.props.data.bio : '',
            online: this.props.data.online ? this.props.data.online : '',
            subjects: this.props.data.subjects ? this.props.data.subjects : ''
        }
    }

    render() {
        return (
            <div>
                <h1>{this.state.name}</h1>
            </div>
        )
    }
}

class DefaultDashTutorList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data ? this.props.data : [],
        }
    }

    render() {
        const renData = this.props.data.map((obj, num) => {
            return <TutorSearchResult data={obj} />
        });

        return (
            <div className="col-md-12">
            <h1>Tutors Currently Online</h1>
                {renData}
            </div>
        )
    }

}
export default DefaultDashTutorList;