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
            id: this.props.id ? this.props.id : ''
        }
    }

    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <div className="col-md-2">
                            <img src={this.state.photo} height="125" width="125"></img>
                        </div>
                        <div className="">
                        <a data-toggle="collapse" data-parent="#accordion" href={'#collapse' + this.state.id}>
                        <h2>
                        {this.state.name + ' '}
                        <span>
                        <img src={this.state.online ? '/images/status-online.png' : '/images/status-offline.png'}></img>
                        </span>
                        </h2>
                        </a>
                        <h4><strong>Subjects:</strong> {this.state.subjects.map((subject, num) => {return subject + ' ';})}</h4>
                        <h5><strong>Availability:</strong> {Object.keys(this.state.availability).map((day, num) => {return (this.state.availability[day].length != 0 ? day + ': ' + this.state.availability[day].map((time, num) => {return time}) + ' ': '') })}</h5>
                        </div>
                    </div>
                    <div id={"collapse" + this.state.id} className="panel-collapse collapse">
                      <div className="panel-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                      minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                      commodo consequat.</div>
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