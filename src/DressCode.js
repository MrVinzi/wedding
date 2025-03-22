import React from "react";

const DressCode = () => {
  return (
    <div id="dresscode" className="dresscode-container">
      <h2 className="dresscode-title">Дрес-код</h2>
      <div className="dresscode-grid">
  
        <div className="dresscode-card ladies">
          <h2 className="dresscode-subtitle">Лейдіс</h2>
          <p>Сукні та костюми у відтінках весільних кольорів: персиковий, бежевий, рожевий, фуксія, а також золотий і срібний. </p>
          <p>Більше натхення дивись тут <a href="https://pin.it/3Ke8TOjRt">Посилання</a></p>
          <div className="dresscode-image-wrapper">
            <img 
              src="/ladies-dresscode.jpeg" 
              alt="Дрес-код для жінок" 
              className="dresscode-image"
            />
          </div>
        </div>

     
        <div className="dresscode-card gentlemen">
          <h2 className="dresscode-subtitle">Джентельменс</h2>
          <p>Будь ласка, обирайте костюми сірого, чорного кольору або у світлих відтінках. Уникайте синього кольору.</p>
          <p> Більше натхення дивись тут <a href="https://pin.it/19rSz5sYl">Посилання</a></p>
          <div className="dresscode-image-wrapper">
            <img 
              src="/gentlemen-dresscode.jpg" 
              alt="Дрес-код для чоловіків" 
              className="dresscode-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DressCode;
