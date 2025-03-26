export const dataFormat = (mongoData) => {
  return mongoData
    .map(({ userId, drink, guestChildren, guestAdults, isStayingAtHotel, countVisits, updateAt }) => ({
      userId,
      drink,
      guestChildren,
      guestAdults,
      isStayingAtHotel,
      countVisits,
      updateAt,
    }))
    .sort((a, b) => a.drink.localeCompare(b.userId))
}

export const totalGuestChildren = (formatData) => formatData.reduce((sum, item) => sum + (item.guestChildren || 0), 0)

export const totalGuestAdults = (formatData) => formatData.reduce((sum, item) => sum + (item.guestAdults || 0), 0)

export const totalStayingAtHotel = (formatData) => formatData.filter((item) => item.isStayingAtHotel).length

export const drinkSummary = (formatData) =>
  formatData.reduce((acc, { drink }) => {
    acc[drink] = (acc[drink] || 0) + 1
    return acc
  }, {})

export const formatDate = (isoString) => {
  return new Date(isoString).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  })
}

export const guestAdultsOptions = [1, 2, 3]
export const guestChildrenOptions = [0, 1, 2, 3]
export const drinkOptions = [
  { name: 'Віскі', value: 'whiskey' },
  { name: 'Вино Сухе', value: 'dwine' },
  { name: 'Вино Напівсолодке', value: 'swine' },
  { name: 'Ігристе вино', value: 'champaign' },
  { name: 'Горілка', value: 'gorilka' },
  { name: 'Б/А', value: 'water' },
]

export const changeArrayLength = (array, length) => {
  const newArray = []
  newArray.length = length
  newArray.fill('')

  if (newArray.length <= array.length) {
    newArray.forEach((_, i) => {
      newArray[i] = array[i] || ''
    })
    return newArray
  }

  array.forEach((_, i) => {
    newArray[i] = array[i] || ''
  })
  return newArray
}

export const allowSubmit = (formData) => {
  const { guestAdults, drink } = formData
  let res = true
  
  if (guestAdults === 0) res = false
  drink.forEach((item) => {
    if (item === '') res = false
  })

  return res
}

export const optionsDrinkToText = (drink) => {
  return drink.map((item) => {
    return drinkOptions.find((option) => option.value === item)?.name
  }).join(', ')
}
