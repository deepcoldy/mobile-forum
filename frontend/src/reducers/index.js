import { combineReducers } from 'redux'
import post from './post'
import category from './category'
import postDetail from './postDetail'
import comment from './comment'
import form from './form'

const todoApp = combineReducers({
  post,
  category,
  postDetail,
  comment,
  form,
})

export default todoApp