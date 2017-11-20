import { UPDATE_CATEGORY } from "../reducers/category"

export const updateCategoryAction = (data) => {
  return {
    type: UPDATE_CATEGORY,
    data
  }
}