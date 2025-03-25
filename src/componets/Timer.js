import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const countdownDate = new Date('2025-05-10T00:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="timer">
      <h2>До нашого весілля залишилось:</h2>
      <div className="timer-container">
        <div className="time-box">
          <span className="time-number">{timeLeft.days}</span>
          <span className="time-label">днів</span>
        </div>
        <div className="time-box">
          <span className="time-number">{timeLeft.hours}</span>
          <span className="time-label">годин</span>
        </div>
        <div className="time-box">
          <span className="time-number">{timeLeft.minutes}</span>
          <span className="time-label">хвилин</span>
        </div>
        <div className="time-box">
          <span className="time-number">{timeLeft.seconds}</span>
          <span className="time-label">секунд</span>
        </div>
      </div>
    </div>
  );
};

export default Timer;
