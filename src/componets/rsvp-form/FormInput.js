import { changeArrayLength } from '../../utils/app-utils'

export const FormInput = ({
  handleSubmit,
  userId,
  formData,
  setFormData,
  guestChildrenOptions,
  guestAdultsOptions,
  drinkOptions,
  allowSubmiting,
}) => {
  return (
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
        <label style={{ color: formData.guestAdults ? undefined : 'red' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <pre style={{ color: 'red' , fontSize: '14px'}}>*</pre>Скільки буде дорослих осіб
          </div>
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
      <div className="rsvp-form-drink">
        <p>Що ви будете пити? Просимо Б/А обирати у випадку, якщо ви взагалі не будете вживати алкоголь.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {Array.from({ length: formData.guestAdults }).map((_, index) => (
            <label key={index} style={{ color: formData.drink[index] ? undefined : 'red' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <pre style={{ color: 'red', fontSize: '14px' }}>*</pre>Напій для особи {index + 1}:
              </div>
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
  )
}
