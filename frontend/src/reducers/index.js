import { combineReducers } from 'redux'
import post from './post'
import category from './category'
import postDetail from './postDetail'
import comment from './comment'

const todoApp = combineReducers({
  post,
  category,
  postDetail,
  comment,
})

export default todoApp