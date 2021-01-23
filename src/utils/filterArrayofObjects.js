export function filterArrayofObjects(arr, payload) {
  const collected = []
  const queries = payload.toLowerCase().split(' ')

  queries.forEach(query => {
    arr.forEach(profile => {
      const keys = Object.keys(profile)
      keys.forEach(key => {
        const toString = String(profile[key]).toLowerCase()

        if (toString.includes(query)) {
          collected.push(profile)
        }
      })
    })
  })

  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
  }

  return getUniqueListBy(collected, 'CreditCardNumber')
}
