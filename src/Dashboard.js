import React from 'react';
import ReactDOM from 'react-dom';
import HomeMenuBar from './homeMenuBar';
import DefaultDash from './defaultDash';

const DashComp = function() {
  return (
    <div>
      <HomeMenuBar/>
      <DefaultDash/>
    </div>
  );
};


ReactDOM.render(
    <DashComp></DashComp>,
    document.getElementById('root')
);