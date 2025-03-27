import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { allowSubmit, changeArrayLength, drinkOptions, guestAdultsOptions, guestChildrenOptions } from '../../utils/app-utils'
import { FormThanks } from './FormThanks'
import { FormInput } from './FormInput'
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
          <FormInput
            handleSubmit={handleSubmit}
            userId={userId}
            formData={formData}
            setFormData={setFormData}
            allowSubmiting={allowSubmiting}
            guestChildrenOptions={guestChildrenOptions}
            guestAdultsOptions={guestAdultsOptions}
            drinkOptions={drinkOptions}     
          />
        )}
        {isSubmitted && <FormThanks formData={formData} setSubmitted={setSubmitted} />}
      </section>
    </>
  )
}

export default RSVPForm
