let validator = (schema) => {
  return (obj) => {
    let {error} = schema.validate(obj)
    if (error) {
      let message = error.message
      return {
        error: message
      }
    }
    return true
  }
}
  

module.exports = validator