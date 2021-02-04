const User = require('./user')
const List = require('./list')
const ListItem = require('./listItems')
const Event = require('./monthlyEvents')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

ListItem.belongsTo(List)
List.hasMany(ListItem)

List.belongsTo(User)
User.hasMany(List)

Event.belongsTo(User)
User.hasMany(Event)

module.exports = {
  User,
  List,
  ListItem,
  Event
}
