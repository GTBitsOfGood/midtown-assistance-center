import React from 'react';

class DashSearchBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-md-8 col-md-offset-2 form-group">
                <input type="text" className="col-md-8 input-lg search-input" placeholder="What subject do you need help with?"></input>
                <input type="datetime-local" className="col-md-3 input-lg search-input" placeholder="Time"></input>
                <span className="input-group-btn">
                    <button className="btn btn-default btn-lg search-btn col-md-12" type="button">
                        <i className="glyphicon glyphicon-search"></i>
                    </button>
                </span>
            </div>
        )
    }

}
export default DashSearchBar;