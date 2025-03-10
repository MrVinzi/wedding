
import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const countdownDate = new Date('2025-05-10T00:00:00').getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days} днів ${hours} годин ${minutes} хвилин ${seconds} секунд`);

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft('Подія настала!');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="timer">
      <h2>До нашого весілля залишилось:</h2>
      <h1>{timeLeft}</h1>
    </div>
  );
};

export default Timer;
