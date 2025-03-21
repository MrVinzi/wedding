import React from 'react';

const EventDetails = () => {
  return (
    <section id="event-details" className="event-details">
        <h2>Деталі весілля</h2>

        <div className="venue-container">
          <div className="venue-text">
            <h3>Місце проведення</h3>
            <p>
            Захід відбудеться в САДИБІ ДАЧА – атмосферному місці серед природи. Ми подбали про ваш комфорт, тому всі ключові моменти нашого свята – церемонія, банкет і вечірка – відбудуться в одному місці. Вам не доведеться нікуди поспішати чи перейматися транспортом. Просто насолоджуйтеся святом, смачною їжею та гарною компанією у серці природи.
            </p>
            <p>
              Адреса: <a href="https://dacha.uz.ua/" target="_blank" rel="noopener noreferrer">Dacha, Циганівці</a>
            </p>
          </div>
          <div className="venue-image">
            <img src="/dacha.jpg" alt="Локація Дача" />
          </div>
        </div>
    </section>
  );
};

export default EventDetails;
