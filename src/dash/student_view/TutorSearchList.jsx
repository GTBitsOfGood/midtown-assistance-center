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


        const renData = this.props.data.length > 0 ? this.props.data.map((obj, num) => {
            return <TutorSearchResult data={obj} id={num}/>;
        }) : <h4>No Results Found</h4>;
        const searchResults = <h3 className="text-uppercase tutors-header">Search Results for <span className='gold_text'>{"'" + this.props.subject + " " + this.props.time + "'"}</span></h3>;
        const tutorsOnline = <h3 className="text-uppercase tutors-header">Tutors Currently Online</h3>
        return (
            <div className="col-md-10 col-md-offset-1 tutor-list-wrapper">
                { this.props.searchType == "online" ? tutorsOnline : searchResults}
                 <div className={ "panel-group " + (this.props.data.length > 0 ? "tutors-list" : "")} id="accordion">
                  {renData}
                 </div>
            </div>
        );
    }

}
export default DefaultDashTutorList;