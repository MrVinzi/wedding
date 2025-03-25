import React from 'react'
import Header from './Header'
import Banner from './Banner'
import Timer from './Timer'
import Gifts from './Gifts'
import EventDetails from './EventDetails'
import Schedule from './Schedule'
import Playlist from './Playlist'
import DressCode from './DressCode'
import RSVPForm from './RSVPForm'
import './App.css'

function App() {
  const queryString = new URLSearchParams(window.location.search);
  const value = queryString.get('USERID')
  
  localStorage.setItem('userId', value || 'Гість');

  return (
    <div className="App">
      <Header />
      <Banner />
      <Timer />
      <Gifts />
      <EventDetails />
      <Schedule />
      <DressCode />
      <Playlist />
      <RSVPForm  />
    </div>
  )
}

export default App
