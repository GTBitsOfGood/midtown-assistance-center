import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOnlineTutors } from '../../redux/actions/student_view_actions';

class DashSearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 'ASAP',
            subject: undefined
        };
        this.handleGeneralChange = this.handleGeneralChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleGeneralChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { getOnlineTutors } = this.props;
        const { subject, time } = this.state;

        getOnlineTutors('searchResults', subject, time);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="col-xs-12 col-sm-8 col-sm-offset-2 search-items">
                    <input
                        onChange={this.handleGeneralChange}
                        type="text"
                        name="subject"
                        className="col-xs-12 col-sm-6 col-md-8 input-lg search-input"
                        placeholder="What subject do you need help with?"
                    />
                    <select
                        name="time"
                        onChange={this.handleGeneralChange}
                        className="col-xs-12 col-sm-2 col-md-3 input input-lg search-select search-input"
                    >
                        <option value="ASAP">ASAP</option>
                        <option value="today">Sometime today</option>
                        <option value="this week">This week</option>
                    </select>
                    <span className="input-group-btn">
                        <button
                            style={{ animationDelay: '2s' }}
                            className="animated tada col-xs-12 btn btn-default btn-lg search-btn"
                            type="submit"
                        >
                            <i className="glyphicon glyphicon-search" />
                        </button>
                    </span>
                </div>
            </form>
        );
    }
}

DashSearchBar.propTypes = {
    getOnlineTutors: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    getOnlineTutors: (searchType, subject, time) => dispatch(getOnlineTutors(searchType, subject, time)),
});

const SearchBar = connect(
    null,
    mapDispatchToProps
)(DashSearchBar);

export default SearchBar;
