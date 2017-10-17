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
            subjects: this.props.data.subjects ? this.props.data.subjects : '',
            classStanding: this.props.data.classStanding ? this.props.data.classStanding : '',
            rating: this.props.data.rating ? this.props.data.rating : '',
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
                            <img src={this.state.photo} height="125" width="125"></img>
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
                        <h4><strong>Subjects:</strong> {this.state.subjects.map((subject, num) => {return subject + ' ';})}</h4>
                        <h5><strong>Availability:</strong> {Object.keys(this.state.availability).map((day, num) => {return (this.state.availability[day].length != 0 ? day + ': ' + this.state.availability[day].map((time, num) => {return time}) + ' ': '') })}</h5>
                        </div>
                    </div>
                    <div id={"collapse" + this.state.id} className="panel-collapse collapse">
                      <div className="panel-body tutor-panel-body">
                      <div className="col-md-3"></div>
                      <h4><strong>{this.state.classStanding}</strong> at Georgia Tech</h4>
                      <h4><strong>Bio: </strong>{this.state.bio}</h4>
                      <h3 className="text-center"><a href='#' className='panel-anchor'>Click Here</a> to request a Google Hangouts meeting with {this.state.name}</h3>
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
            <div className="col-md-10 col-md-offset-1">
                <h1>Tutors Currently Online</h1>
                 <div className="panel-group" id="accordion">
                  {renData}
                 </div>

            </div>
        )
    }

}
export default DefaultDashTutorList;