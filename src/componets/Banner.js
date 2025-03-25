import React from 'react'

const Banner = () => {
  const name = localStorage.getItem('userId');
  const isOneGuest = name ? name.indexOf(' ') > 0 : false;

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
