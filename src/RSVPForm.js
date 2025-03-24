import React, { useState } from "react";
import axios from "axios";

const RSVPForm = () => {
  const [isSubmitted, setSubmitted] = useState(false);
  const name = localStorage.getItem("userId") || "Гість";
  const [guestChildren, setGuestChildren] = useState(0);
  const [drink, setDrink] = useState(0);
  const [isStayingAtHotel, setIsStatyngAtHotel] = useState(false);

  const user = {
    name,
    guestChildren,
    drink,
    isStayingAtHotel
  };

  window.history.replaceState({}, "", "home");

  const handleSubmit = (e) => {
    if (localStorage.getItem("submitted")) {
      return;
    }

    e.preventDefault();
    //Change endpoint to the real one
    axios
      .post("endpoint", { user })
      .then((res) => {
        localStorage.setItem("submitted", true);
        setSubmitted(true);
      })
      .catch((err) => {
        alert("Щось пішло не так, спробуйте пізніше");
        console.log(err);
      });
  };

  return (
    <>
      {!isSubmitted && (
        <section id="rsvp-form" className="rsvp-form">
          <h2>Реєстрація на захід</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Ваше ім'я"
              value={name}
              disabled
            />
            <div>
              <label>
                <input
                  type="checkbox"
                  name="stay"
                  checked={isStayingAtHotel}
                  onChange={(e) => setIsStatyngAtHotel(e.target.checked)}
                />
                Залишаюся на ніч
              </label>
            </div>
            <div>
              <label>
                Діти:
                <select
                  name="guestChildren"
                  value={guestChildren}
                  onChange={(e) => setGuestChildren(Number(e.target.value))}
                  required
                >
                  <option value="">Виберіть к-сть дітей</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </label>
            </div>
            <div>
              <label>
                Напої:
                <select
                  name="drink"
                  value={drink}
                  onChange={(e) => setDrink(e.target.value)}
                  required
                >
                  <option value="">Виберіть напій</option>
                  <option value="wine">Вино</option>
                  <option value="beer">Пиво</option>
                  <option value="whiskey">Віскі</option>
                  <option value="champaign">Ігристе вино</option>
                  <option value="water">Вода</option>
                </select>
              </label>
            </div>
            <button type="submit">Подати заявку</button>
          </form>
        </section>
      )}
      {isSubmitted && (
        <div className="thanks">
          Дякуємо за заповнення форми, чекатимо Вас
        </div>
      )}
    </>
  );
};

export default RSVPForm;
