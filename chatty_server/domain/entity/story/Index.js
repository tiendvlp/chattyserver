const storyEntityFactory = require('./StoryEntity')
const storyEntityValidatorSchemma = require ('./StoryEntityValidatorSchema')
const entityValidator = require('../../../common/validator/validator') (storyEntityValidatorSchemma)
module.exports = storyEntityFactory(entityValidator)