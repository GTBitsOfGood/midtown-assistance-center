import React from 'react';

class DashSearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 'ASAP',
            subject: undefined
        };
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
    }

    handleTimeChange(e) {
        this.setState({time:e.target.value});
    }

    handleSubjectChange(e) {
        this.setState({subject:e.target.value});
    }

    render() {
        return (
            <div className="col-xs-12 col-sm-8 col-sm-offset-2 search-items">
                <input onChange={this.handleSubjectChange} type="text" className="col-xs-12 col-sm-6 col-md-8 input-lg search-input" placeholder="What subject do you need help with?"></input>
                <select onChange={this.handleTimeChange} className="col-xs-12 col-sm-2 col-md-3 input input-lg search-select search-input">
                    <option value="ASAP">ASAP</option>
                    <option value="today">Sometime today</option>
                    <option value="this week">This week</option>
                </select>
                <span className="input-group-btn">
                    <button onClick={this.state.subject != null ? () => this.props.handleSearchClicked(this.state.subject, this.state.time) : ''} style={{animationDelay: '2s'}} className="animated tada col-xs-12 btn btn-default btn-lg search-btn" type="button">
                        <i className="glyphicon glyphicon-search"></i>
                    </button>
                </span>
            </div>
        );
    }

}
export default DashSearchBar;