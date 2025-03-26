import axios from 'axios'
import { useEffect, useState } from 'react'

const Total = () => {
  const [mongoData, setMongoData] = useState([])
  const url = 'https://api-fiverr-dev.queue-my.net/w-user'

  // Форматування та сортування
  const formattedData = mongoData
    .map(({ userId, drink, guestChildren, isStayingAtHotel, countVisits }) => ({
      userId,
      drink,
      guestChildren,
      isStayingAtHotel,
      countVisits
    }))
    .sort((a, b) => a.drink.localeCompare(b.drink))

  // Обчислення підсумків
  const totalGuestChildren = formattedData.reduce((sum, item) => sum + (item.guestChildren || 0), 0)
  const totalStayingAtHotel = formattedData.filter((item) => item.isStayingAtHotel).length

  // Групування за drink
  const drinkSummary = formattedData.reduce((acc, { drink }) => {
    acc[drink] = (acc[drink] || 0) + 1
    return acc
  }, {})

  useEffect(() => {
    axios({
      method: 'get',
      url,
      withCredentials: false,
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => {
        setMongoData(res?.data?.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  console.log('Formatted Data:', formattedData)
  console.log('Total Guest Children:', totalGuestChildren)
  console.log('Total Staying at Hotel:', totalStayingAtHotel)
  console.log('Drink Summary:', drinkSummary)

  return (
    <div>
      {/* Перша таблиця */}
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Drink</th>
            <th>Guest Children</th>
            <th>Is Staying at Hotel</th>
            <th>Count Visits</th>
          </tr>
        </thead>
        <tbody>
          {formattedData.map((item, index) => (
            <tr key={index}>
              <td>{item.userId}</td>
              <td>{item.drink}</td>
              <td>{item.guestChildren}</td>
              <td>{item.isStayingAtHotel ? 'Yes' : 'No'}</td>
              <td>{item.countVisits}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">
              <strong>Totals</strong>
            </td>
            <td>
              <strong>{totalGuestChildren}</strong>
            </td>
            <td>
              <strong>{totalStayingAtHotel}</strong>
            </td>
            <td>
              <strong>-</strong>
            </td>
          </tr>
        </tfoot>
      </table>

      <br />

      {/* Друга таблиця */}
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Drink</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(drinkSummary).map(([drink, count]) => (
            <tr key={drink}>
              <td>{drink}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Total
