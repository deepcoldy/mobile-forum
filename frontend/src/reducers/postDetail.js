
const GET_POST_DETAIL = 'GET_POST_DETAIL';

const post = (state = {
  title: '',
  content: '',
}, action) => {
  switch (action.type) {
    case GET_POST_DETAIL:
      return action.data
    default:
      return state
  }
}

export default post