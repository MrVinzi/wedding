import React, { useEffect, useState } from 'react'
import axios from 'axios'

const RSVPForm = () => {
  const [isSubmitted, setSubmitted] = useState(false)
  const userId = localStorage.getItem('userId') || 'Гість'
  const url = 'https://api-fiverr-dev.queue-my.net/w-user/update-or-create'

  const [formData, setFormData] = useState({
    guestChildren: 0,
    drink: '',
    isStayingAtHotel: false,
  })

  // Заповнення форми реестації збереженими раніше значеннями та Підрахунок кількості входів на сайт
  useEffect(() => {
    setSubmitted(true)
    axios({
      method: 'post',
      url,
      data: { filter: { userId }, data: { $inc: { countVisits: 1 } } },
      withCredentials: false,
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => {
        setSubmitted(false)
        setFormData({
          guestChildren: res?.data?.data?.guestChildren || 0,
          drink: res?.data?.data?.drink || '',
          isStayingAtHotel: res?.data?.data?.isStayingAtHotel || false,
        })
      })
      .catch((err) => {
        console.log(err)
        setSubmitted(false)
      })
  }, [userId])

  // Збереження даних з форми в базу даних
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    axios({
      method: 'post',
      url,
      data: { filter: { userId }, data: formData },
      withCredentials: false,
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => {
        setSubmitted(false)
      })
      .catch((err) => {
        alert('Щось пішло не так, спробуйте пізніше')
        console.log(err)
        setSubmitted(false)
      })
  }

  return (
    <>
      <section id="rsvp-form" className="rsvp-form">
        <h2>Реєстрація на захід</h2>
        {!isSubmitted && (
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Ваше ім'я" value={userId} disabled />
            <div>
              <label>
                Залишаюся на ніч в Садибі Дача
                <input
                  type="checkbox"
                  name="stay"
                  checked={formData.isStayingAtHotel}
                  onChange={(e) => {
                    setFormData({ ...formData, isStayingAtHotel: e.target.checked })
                  }}
                />
              </label>
            </div>
            <div>
              <label>
                Скількох дітей ви плануєте взяти
                <select
                  name="guestChildren"
                  value={formData.guestChildren}
                  onChange={(e) => {
                    setFormData({ ...formData, guestChildren: Number(e.target.value) })
                  }}
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
                  value={formData.drink}
                  onChange={(e) => {
                    setFormData({ ...formData, drink: e.target.value })
                  }}
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
            <button type="submit" onSubmit={handleSubmit}>
              Зареєструватись
            </button>
          </form>
        )}
        {isSubmitted && <div className="thanks">Дякуємо за заповнення форми, до зустрічі 10.05 у Садибі Дача!</div>}
      </section>
    </>
  )
}

export default RSVPForm
