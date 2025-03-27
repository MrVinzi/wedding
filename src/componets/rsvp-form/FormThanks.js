import { optionsDrinkToText } from '../../utils/app-utils'

export const FormThanks = ({ formData, setSubmitted }) => {
  return (
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
              <td сolspan="2">Залишаюся на ніч в Садибі Дача</td>
            </tr>
          )}
          {formData.guestChildren > 0 && (
            <tr>
              <td>Кількість дітей</td>
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
  )
}
