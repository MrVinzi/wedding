import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import {
  dataFormat,
  formatDate,
  totalGuestAdults,
  totalGuestChildren,
  totalStayingAtHotel,
  drinkTotal,
} from '../utils/app-utils'

const Total = () => {
  const [mongoData, setMongoData] = useState([])
  const url = 'https://api-fiverr-dev.queue-my.net/w-user'

  const formattedData = useMemo(() => {
    return dataFormat(mongoData)
  }, [mongoData])

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
        const data = res?.data?.data
        const sortedData = data.sort((a, b) => new Date(b.updateAt) - new Date(a.updateAt))
        setMongoData(sortedData)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  console.log('Formatted Data:', formattedData)
  console.log('Total Guest Children:', totalGuestChildren(formattedData))
  console.log('Total Guest Adults:', totalGuestAdults(formattedData))
  console.log('Total Staying at Hotel:', totalStayingAtHotel(formattedData))
  console.log('Drink Summary:', drinkTotal(formattedData))

  return (
    <div style={{ margin: '20px' }}>
      {/* Перша таблиця */}
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Children</th>
            <th>Adults</th>
            <th>Drink</th>
            <th>Is Hotel</th>
            <th>Visits</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {formattedData.map((item, index) => (
            <tr key={index}>
              <td>{item.userId}</td>
              <td>{item.guestChildren ? item.guestChildren : ''}</td>
              <td>{item.guestAdults ? item.guestAdults : ''}</td>
              <td>{item.drink.join(', ')}</td>
              <td>{item.isStayingAtHotel ? 'Yes' : ''}</td>
              <td>{item.countVisits ? item.countVisits : ''}</td>
              <td>{formatDate(item.updateAt)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <strong>Totals</strong>
            </td>
            <td>
              <strong>{totalGuestChildren(formattedData || [])}</strong>
            </td>
            <td>
              <strong>{totalGuestAdults(formattedData || [])}</strong>
            </td>
            <td>
              <strong>-</strong>
            </td>
            <td>
              <strong>-</strong>
            </td>
            <td>
              <strong>-</strong>
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
          {Object.entries(drinkTotal(formattedData)).map(([drink, count]) => (
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
