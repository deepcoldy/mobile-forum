
const INITIAL_STATE = {
  title: '',
  content: '',
}
export const GET_POST_DETAIL = 'GET_POST_DETAIL';

const post = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_POST_DETAIL:
      return action.data
    default:
      return state
  }
}

export default post