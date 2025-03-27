import React from 'react'
import { motion } from "framer-motion";
import Header from './componets/Header'
import Banner from './componets/Banner'
import Timer from './componets/Timer'
import Gifts from './componets/Gifts'
import EventDetails from './componets/EventDetails'
import Schedule from './componets/Schedule'
import Playlist from './componets/Playlist'
import DressCode from './componets/DressCode'
import './App.css'
import Total from './componets/Total'
import RSVPForm from './componets/rsvp-form/Form'

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 3 } }
};

function App() {
  const queryString = new URLSearchParams(window.location.search)
  const value = queryString.get('USERID')

  if (value && value !== 'total') localStorage.setItem('userId', value)

  return (
    <div className="App">
      <motion.header initial="hidden" animate="visible" variants={fadeIn}>
        <Header />
      </motion.header>

      <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        <Banner />
        <Timer />
      </motion.div>

      <motion.section initial="hidden" animate="visible" variants={fadeIn}>
        <Gifts />
      </motion.section>

      <motion.section initial="hidden" animate="visible" variants={fadeIn}>
        <EventDetails />
      </motion.section>

      <motion.section initial="hidden" animate="visible" variants={fadeIn}>
       <Schedule />
      </motion.section>

      <motion.section initial="hidden" animate="visible" variants={fadeIn}>
        <DressCode />
      </motion.section>

      <motion.section initial="hidden" animate="visible" variants={fadeIn}>
        <Playlist />
      </motion.section>

      <motion.section initial="hidden" animate="visible" variants={fadeIn}>
        {value !== 'total'&& value !== 'Гість' && <RSVPForm />}
        {value === 'total' && <Total />}
      </motion.section>

    </div>
  )
}

export default App
