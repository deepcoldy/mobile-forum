export const UPDATE_CATEGORY = 'UPDATE_CATEGORY'

const category = (state = [], action) => {
  switch (action.type) {
    case UPDATE_CATEGORY:
      return action.data
    default:
      return state
  }
}

export default category