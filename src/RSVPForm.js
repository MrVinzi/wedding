import React, { useState } from 'react';

const RSVPForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    stay: false,
    drinks: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Дякуємо за вашу реєстрацію!');
  };

  return (
    <section id="rsvp-form" className="rsvp-form">
      <h2>Реєстрація на захід</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Ваше ім'я"
          value={formData.name}
          onChange={handleInputChange}
        />
        <div>
          <label>
            <input
              type="checkbox"
              name="stay"
              checked={formData.stay}
              onChange={handleInputChange}
            />
            Залишаюся на ніч
          </label>
        </div>
        <div>
          <label>
            Напої:
            <select name="drinks" value={formData.drinks} onChange={handleInputChange}>
              <option value="">Виберіть напій</option>
              <option value="wine">Вино</option>
              <option value="beer">Пиво</option>
              <option value="water">Вода</option>
            </select>
          </label>
        </div>
        <button type="submit">Подати заявку</button>
      </form>
    </section>
  );
};

export default RSVPForm;