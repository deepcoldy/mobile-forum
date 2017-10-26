import { combineReducers } from 'redux'
import category from './category'
import comment from './comment'

const todoApp = combineReducers({
  category,
  comment
})

export default todoApp