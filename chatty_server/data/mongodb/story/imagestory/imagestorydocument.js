const schema = require('./imagestoryschema')
const validator = require('../../../../common/validator/validator')(schema)

module.exports = function (imageStoryDocument) {
                    let {error} = validator (imageStoryDocument)
                    if (error) throw new Error(error)
                    return imageStoryDocument
                }