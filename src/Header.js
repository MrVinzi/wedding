import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <nav>
      <button className="menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? 'X' : 'Меню'}
      </button>
        <ul className={`${isMenuOpen ? 'open' : ''}`}> 
          <li><a href="#event-details">Деталі</a></li>
          <li><a href="#dresscode">Дрескод</a></li>
          <li className="logo-item">
          </li>
          <li><a href="#playlist">Плейлист</a></li>
          <li><a href="#rsvp-form">Реєстрація</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
