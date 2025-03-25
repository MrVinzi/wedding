import React from 'react';


const Schedule = () => {
  return (
  <div id="schedule" className="schedule">
      <section className="schedule-overlay">
        <div className="schedule-container">
          <h2>Розклад подій</h2>
          <div className="schedule-item">
            <div className="schedule-time">17:00 - 18:00</div>
            <div className="schedule-event">
              <h3 className="schedule-title">Церемонія</h3>
              <p className="schedule-info">Найзворушливіший момент дня – наша весільна церемонія.</p>
            </div>
          </div>
          <div className="schedule-item">
            <div className="schedule-time">18:00 - 20:00</div>
            <div className="schedule-event">
              <h3 className="schedule-title">Банкет</h3>
              <p className="schedule-info">Смачне частування та затишна атмосфера серед рідних і друзів.</p>
            </div>
          </div>
          <div className="schedule-item">
            <div className="schedule-time">20:00 - 06:00</div>
            <div className="schedule-event">
              <h3 className="schedule-title">Диско</h3>
              <p className="schedule-info">Танці, музика та найкращий настрій для нашого свята!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Schedule;
