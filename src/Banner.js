import React from 'react';

const Banner = () => {
  const queryString = new URLSearchParams(window.location.search);
  const value = queryString.get("USERID");
  sessionStorage.setItem('userId', value);
  const name = sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') : "Наш гість";
  return (
    <section id="banner" className="banner">
      <div className='welcoming'>
         <h1>Привіт</h1>
          <p>{name}</p>
      </div>
     
    </section>
  );
};

export default Banner;