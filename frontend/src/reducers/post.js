export const UPDATE_ALLPOST = 'UPDATE_ALLPOST';
export const ADD_POST = 'ADD_POST';
export const VOTE_POST = 'VOTE_POST';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';

const post = (state = [], action) => {
  switch (action.type) {
    case UPDATE_ALLPOST:
      return action.data
    case ADD_POST:
      return [...state, action.data]
    case VOTE_POST:
      return [...state.map((post) => {
        if (post.id === action.id) {
          post.voteScore = Number(post.voteScore + action.score)
        }
        return post
      })]
    case DELETE_POST:
      return [...state.map((post) => {
        if (post.id === action.id) {
          post.deleted = true
        }
        return post
      })]
    case EDIT_POST:
      return [...state.map((post) => {
        if (post.id === action.id) {
          post.body = action.body
          post.title = action.title
        }
        return post
      })]
    default:
      return state
  }
}

export default post