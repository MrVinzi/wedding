import React from 'react';
import Header from './Header';
import Banner from './Banner';
import Playlist from './Playlist';
import Timer from './Timer';
import DressCode from './DressCode';
import EventDetails from './EventDetails';
import RSVPForm from './RSVPForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Banner />
      <Timer/> 
      <EventDetails />
      <DressCode />
      <Playlist/>
      <RSVPForm />
    </div>
  );
}

export default App;