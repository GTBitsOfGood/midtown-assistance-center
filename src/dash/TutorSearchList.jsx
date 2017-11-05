import React from 'react';
import TutorSearchResult from './TutorSearchResult.jsx';


class DefaultDashTutorList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data ? this.props.data : [],
        };
    }

    render() {


        const renData = this.props.data.map((obj, num) => {
            return <TutorSearchResult data={obj} id={num}/>;
        });

        return (
            <div className="col-md-10 col-md-offset-1 tutor-list-wrapper">
                <h3 className="text-uppercase tutors-header">
                { this.props.searchType == "online" ? "Tutors Currently Online" : "Search Results"}
                </h3>
                 <div className="panel-group tutors-list" id="accordion">
                  {renData}
                 </div>
            </div>
        );
    }

}
export default DefaultDashTutorList;