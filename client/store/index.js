import {createStore, combineReducers, applyMiddleware} from 'redux'
// import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import todo from './todoStore'
import user from './user'
import singleTodo from './singleTodoStore'
import monthlyEvents from './monthlyEvents'
import eventDetails from './eventDetails'

const reducer = combineReducers({
  todo,
  user,
  singleTodo,
  monthlyEvents,
  eventDetails
})

// const middleware = composeWithDevTools(
//   applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
// )
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(reducer, middleware)

export default store
export * from './user'
