const validate = (payload, setInvalidFields) => {
  let invalids = 0
  let fields = Object.entries(payload)
  setInvalidFields([])
  fields.forEach(item => {
    if (item[1] === '') {
      setInvalidFields(prev => [...prev, {
        name: item[0],
        message: 'This field is mandatory'
      }])
      invalids++
    }
  })
  fields.forEach(item => {
    switch (item[0]) {
      case 'password':
        if (item[1].length < 6) {
          setInvalidFields(prev => [...prev, {
            name: item[0],
            message: 'Password must have at least 6 characters.'
          }])
          invalids++
        }
        break;
      case 'phone':
        if (!+item[1]) {
          setInvalidFields(prev => [...prev, {
            name: item[0],
            message: 'Phone number is invalid.'
          }])
          invalids++
        }
        break
      case 'priceNumber':
      case 'acreageNumber':
        if (+item[1] === 0) {
          setInvalidFields(prev => [...prev, {
            name: item[0],
            message: 'This field is empty'
          }])
          invalids++
        }
        if (!+item[1]) {
          setInvalidFields(prev => [...prev, {
            name: item[0],
            message: 'This field must be number'
          }])
          invalids++
        }
        break
      default:
        break
    }
  })
  return invalids
}

export default validate