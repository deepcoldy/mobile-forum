
import { UPDATE_ALLPOST, ADD_POST } from "../reducers/post";

export const getAllPostAction = (data) => {
  return {
    type: UPDATE_ALLPOST,
    data
  }
}

export const addPostAction = (data) => {
  return {
    type: ADD_POST,
    data
  }
}