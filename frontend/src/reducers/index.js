import { combineReducers } from 'redux'
import register from './register'

export default combineReducers({
  user: register,
})
