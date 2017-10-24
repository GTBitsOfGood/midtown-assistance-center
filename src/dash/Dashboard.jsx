import React from 'react';
import ReactDOM from 'react-dom';
import HomeMenuBar from '../MenuBar.jsx';
import DefaultDash from './DefaultDash.jsx';
import { Provider } from 'react-redux';
import store from '../redux/store.js';

const DashComp = function() {
    return (
        <div className="animated fadeInDown">
            <HomeMenuBar homeordash='dash'/>
            <DefaultDash/>
        </div>
    );
};


ReactDOM.render(
    <Provider store={store}>
        <DashComp></DashComp>
    </Provider>,
    document.getElementById('root')
);

