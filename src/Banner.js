import React from 'react'

const Banner = () => {
  const name = sessionStorage.getItem('userId')
  const isOneGuest = name.indexOf(' ') > 0

  return (
    <div id="banner" className="banner">
      <div className="banner-overlay">
        <div className="welcoming">
          <h3>{isOneGuest ? 'Дорогі наші' : 'Дорогий/а'}</h3>
          <h1>{name}</h1>
        </div>
      </div>
    </div>
  )
}

export default Banner
