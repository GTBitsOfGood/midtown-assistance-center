import React from 'react';



class TutorSearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.data.first_name ? this.props.data.first_name : 'NoName',
            availability: this.props.data.availability ? this.props.data.availability : '',
            profile_picture: this.props.data.profile_picture ? this.props.data.profile_picture : '',
            bio: this.props.data.bio ? this.props.data.bio : '',
            online: this.props.data.online ? this.props.data.online : '',
            subjects: this.props.data.subjects ? this.props.data.subjects : '',
            class_standing: this.props.data.class_standing ? this.props.data.class_standing : '',
            rating: this.props.data.rating ? this.props.data.rating : '',
            gender: this.props.data.gender ? this.props.data.gender : '',
            id: this.props.id ? this.props.id : '',
            fullStars:0,
            halfStars:0,
            emptyStars:0,
        };




    }


    render() {
        this.state.halfStars = (this.state.rating - Math.floor(this.state.rating))/0.5;
        this.state.emptyStars = (5 - Math.ceil(this.state.rating));
        this.state.fullStars = Math.floor(this.state.rating);
        var stars = [];
        for (var x = 0; x < this.state.fullStars; x++) {
            stars.push(<span><img className="star" src='/images/full-star.png' width="25" height="25"></img></span>);
        }
        for (var y = 0; y < this.state.halfStars; y++) {
            stars.push(<span><img className="star" src='/images/half-star.png' width="25" height="25"></img></span>);
        }
        for (var z = 0; z < this.state.emptyStars; z++) {
            stars.push(<span><img className="star" src='/images/empty-star.png' width="25" height="25"></img></span>);
        }
        return (
            <div>
                <div className="panel panel-default tutor-panel">
                    <div className="panel-heading tutor-panel-heading">
                        <div className="col-md-2">
                            <img className="tutor-profile-pic img-circle" src={this.state.profile_picture} height="125" width="125"></img>
                        </div>
                        <div className="">
                        <a data-toggle="collapse" className="tutor-name" data-parent="#accordion" href={'#collapse' + this.state.id}>
                        <h2>
                        {this.state.name + ' '}
                        <span>
                        <img src={this.state.online ? '/images/status-online.png' : '/images/status-offline.png'}></img>
                        </span>
                        &emsp;
                        {stars}
                        </h2>
                        </a>
                        <h4><strong>Subjects:</strong><span className="lighter-text"> {this.state.subjects.map((subject, num) => {return ' ' + subject.subject + '(' + subject.start_grade + '-' + subject.end_grade + ')' + ' ';})}</span></h4>
                        <h4><strong>Availability:</strong><span className="lighter-text"> {Object.keys(this.state.availability).map((day, num) => {return (this.state.availability[day].length != 0 ? day + '- ' + this.state.availability[day].map((time, num) => {return time.start_time + '-' + time.end_time}) + ' ': '') })}</span></h4>
                        </div>
                    </div>
                    <div id={"collapse" + this.state.id} className="panel-collapse collapse">
                      <div className="panel-body tutor-panel-body">
                      <div className="tutor_details container col-md-12">
                      <div className="col-md-6">
                      <h3><strong>Details</strong></h3>
                      <h4><span><img className="small_img" src='/images/graduate-cap.png'></img></span><strong>{this.state.class_standing}</strong><span className="lighter-text"> at Georgia Tech</span></h4>
                      <h4 className="capitalize"><span><img className="small_img" src={'/images/' + this.state.gender + '.png'}></img></span><strong>{this.state.gender}</strong></h4>
                      </div>
                      <div className="col-md-6">
                      <h3><strong>Bio </strong></h3>
                      <h4><span className="lighter-text">{this.state.bio}</span></h4>
                      </div>
                      </div>
                      <div className="request_hangout text-center">
                      <h3 className="text-center"><strong>Request a Google Hangouts meeting with {this.state.name}</strong>
                      </h3>
                      <button className="btn btn-lg btn-default mac_button" type="button">
                      Click Here
                      </button>
                      </div>
                      </div>
                    </div>
                 </div>
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
            return obj.online ? <TutorSearchResult data={obj} id={num}/> : ''
        });

        return (
            <div className="col-md-10 col-md-offset-1 tutor-list-wrapper">
                <h3 className="text-uppercase tutors-header">Tutors Currently Online</h3>
                 <div className="panel-group tutors-list" id="accordion">
                  {renData}
                 </div>

            </div>
        )
    }

}
export default DefaultDashTutorList;