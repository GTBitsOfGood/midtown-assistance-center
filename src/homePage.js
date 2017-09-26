import React from 'react';
import ReactDOM from 'react-dom';
import './Homepage.css';

class Homepage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div className="wrap">
            <div><h1>Hello Everyone</h1></div>
          </div>
        );
    }
}


// export default Homepage;
// ReactDOM.render(<h1>hello</h1>, document.getElementById('root'));
ReactDOM.render(<Homepage/>, document.getElementById('root'));