import React from 'react';

class DashSearchBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-xs-12 col-sm-8 col-sm-offset-2 search-items">
                <input type="text" className="col-xs-12 col-sm-6 col-md-8 input-lg search-input" placeholder="What subject do you need help with?"></input>
                <select className="col-xs-12 col-sm-2 col-md-3 input input-lg search-select search-input">
                    <option value="ASAP">ASAP</option>
                    <option value="today">Sometime today</option>
                </select>
                <span className="input-group-btn">
                    <button className="col-xs-12 btn btn-default btn-lg search-btn" type="button">
                        <i className="glyphicon glyphicon-search"></i>
                    </button>
                </span>
            </div>
        )
    }

}
export default DashSearchBar;