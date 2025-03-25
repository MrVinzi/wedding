import React from 'react'
import Header from './componets/Header'
import Banner from './componets/Banner'
import Timer from './componets/Timer'
import Gifts from './componets/Gifts'
import EventDetails from './componets/EventDetails'
import Schedule from './componets/Schedule'
import Playlist from './componets/Playlist'
import DressCode from './componets/DressCode'
import RSVPForm from './componets/RSVPForm'
import './App.css'

function App() {
  const queryString = new URLSearchParams(window.location.search);
  const value = queryString.get('USERID')

  if (value) localStorage.setItem('userId', value);

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
