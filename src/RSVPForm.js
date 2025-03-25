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
    <section id="rsvp-form" className="rsvp-form">
      <h2>Реєстрація на захід</h2>
      {!isSubmitted && (
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
              Залишаюся на ніч в Садибі Дача
              <input
                type="checkbox"
                name="stay"
                checked={isStayingAtHotel}
                onChange={(e) => setIsStatyngAtHotel(e.target.checked)}
              />
            </label>
          </div>
          <div>
            <label>
              Скількох дітей ви плануєте взяти
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
              Що ви будете пити 
              <select
                name="drink"
                value={drink}
                onChange={(e) => setDrink(e.target.value)}
                required
              >
                  <option value="">Виберіть напій</option>
                <option value="whiskey">Віскі</option>
                <option value="dwine">Вино Сухе</option>
                <option value="swine">Вино Напівсолодке</option>
                <option value="champaign">Ігристе вино</option>
                <option value="gorilka">Горілка</option>
                <option value="water">Б/А</option>
              </select>
            </label>
          </div>
          <button type="submit">Зареєструватись</button>
        </form>
       
      )}
      {isSubmitted && (
        <div className="thanks">
          Дякуємо за заповнення форми, до зустрічі 10.05 у Садибі Дача!
        </div>
      )} 
      </section>
    </>
  );
};

export default RSVPForm;
