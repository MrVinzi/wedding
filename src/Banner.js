import React from 'react';

const Banner = () => {
  const queryString = new URLSearchParams(window.location.search);
  const value = queryString.get("USERID");
  sessionStorage.setItem('userId', value);
  const name = sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') : "Гість";
  const isOneGuest = name.indexOf(" ") > 0;

  return (
    <div id="banner" className="banner">
      <div className="banner-overlay">
        <div className="welcoming">
          <h3>{isOneGuest ? 'Дорогі наші' : 'Дорогий/а'}</h3>
          <h1>{name}</h1>
        </div>
      </div>
    </div>
  );
};

export default Banner;