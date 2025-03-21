import React from 'react';
import Header from './Header';
import Banner from './Banner';
import Timer from './Timer';
import Gifts from './Gifts';
import EventDetails from './EventDetails';
import Schedule from './Schedule';
import Playlist from './Playlist';
import DressCode from './DressCode';
import RSVPFormDemo from './RSVPFormDemo';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Banner />
      <Timer /> 
      <Gifts />
      <EventDetails />
      <Schedule />
      <DressCode />
      <Playlist/>
      <RSVPFormDemo />
    </div>
  );
}

export default App;