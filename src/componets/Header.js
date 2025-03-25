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
          <li><a href="src#event-details">Деталі</a></li>
          <li><a href="src#dresscode">Дрескод</a></li>
          <li className="logo-item">
          </li>
          <li><a href="src#playlist">Плейлист</a></li>
          <li><a href="src#rsvp-form">Реєстрація</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
