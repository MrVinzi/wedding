import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  allowSubmit,
  changeArrayLength,
  drinkOptions,
  guestAdultsOptions,
  guestChildrenOptions,
  optionsDrinkToText,
} from '../utils/app-utils'

const RSVPForm = () => {
  const [isSubmitted, setSubmitted] = useState(false)
  const userId = localStorage.getItem('userId') || 'Гість'
  const url = 'https://api-fiverr-dev.queue-my.net/w-user/update-or-create'

  const [formData, setFormData] = useState({
    guestChildren: 0,
    guestAdults: 0,
    drink: [],
    isStayingAtHotel: false,
  })

  // Заповнення форми реестації збереженими раніше значеннями та Підрахунок кількості входів на сайт
  useEffect(() => {
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
        const { guestChildren, guestAdults, drink, isStayingAtHotel } = res?.data?.data
        setFormData({
          guestChildren: guestChildren || 0,
          guestAdults: guestAdults || 0,
          drink: changeArrayLength(drink || [], guestAdults || 0),
          isStayingAtHotel: isStayingAtHotel || false,
        })
        if (guestAdults > 0) setSubmitted(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [userId])


  // Збереження даних з форми в базу даних
  const handleSubmit = (e) => {
    e.preventDefault()
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
        setSubmitted(true)
      })
      .catch((err) => {
        alert('Щось пішло не так, спробуйте пізніше')
        console.log(err)
      })
  }

  const allowSubmiting = allowSubmit(formData)

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
                  {guestChildrenOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <label style={{ color:  formData.guestAdults ? undefined : 'red'}}>
                Скільки буде дорослих осіб
                <select
                  name="guestAdults"
                  value={formData.guestAdults}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      guestAdults: Number(e.target.value),
                      drink: changeArrayLength(formData.drink, Number(e.target.value)),
                    })
                  }}
                  required
                >
                  <option value="">Виберіть к-сть дорослих</option>
                  {guestAdultsOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label>Що ви будете пити</label>
                {Array.from({ length: formData.guestAdults }).map((_, index) => (
                  <label key={index} style={{ color:  formData.drink[index] ? undefined : 'red'}}>
                    Напій для особи {index + 1}:
                    <select
                      name={`drink${index}`}
                      value={formData.drink[index]}
                      required
                      onChange={(e) => {
                        const newDrink = formData.drink
                        newDrink[index] = e.target.value
                        setFormData({ ...formData, drink: newDrink })
                      }}
                    >
                      <option value="">Виберіть напій</option>
                      {drinkOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              onSubmit={handleSubmit}
              disabled={!allowSubmiting}
              style={{
                cursor: allowSubmiting ? 'pointer' : 'not-allowed',
                opacity: allowSubmiting ? 1 : 0.6,
                backgroundColor: allowSubmiting ? undefined : 'gray',
              }}
            >
              Зареєструватись
            </button>
          </form>
        )}
        {isSubmitted && (
          <>
            <div className="thanks">Дякуємо за заповнення форми, до зустрічі 10.05 у Садибі Дача!</div>
            <div style={{ paddingTop: '10px' }}>
              <table
                border=""
                cellpadding="8"
                cellspacing="0"
                style={{ borderColor: 'white', width: '100%', textAlign: 'left' }}
              >
                {formData.isStayingAtHotel && (
                  <tr>
                    <td сolspan="2">ВИ Залишаюсsя на ніч в Садибі Дача</td>
                  </tr>
                )}
                {formData.guestChildren > 0 && (
                  <tr>
                    <td >Кількість дітей</td>
                    <td>{formData.guestChildren}</td>
                  </tr>
                )}
                <tr>
                  <td>Кількість дорослих</td>
                  <td>{formData.guestAdults}</td>
                </tr>
                <tr>
                  <td>Ваші напої</td>
                  <td>{optionsDrinkToText(formData.drink)}</td>
                </tr>
              </table>
            </div>
            <button onClick={() => setSubmitted(false)}>Заповнити ще раз</button>
          </>
        )}
      </section>
    </>
  )
}

export default RSVPForm
