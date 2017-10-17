import React from 'react';
import ReactDOM from 'react-dom';
import HomeMenuBar from './homeMenuBar';

const DashComp = function() {
  return (
    <div>
      <HomeMenuBar/>
    </div>
  );
};


ReactDOM.render(
    <DashComp></DashComp>,
    document.getElementById('root')
);