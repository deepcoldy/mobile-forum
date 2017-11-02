const UPDATE_ALLPOST = 'UPDATE_ALLPOST';
const ADD_POST = 'ADD_POST';
const VOTE_POST = 'VOTE_POST';

const post = (state = [], action) => {
  switch (action.type) {
    case UPDATE_ALLPOST:
      return action.data
    case ADD_POST:
      return [...state, action.data]
    case VOTE_POST:
      const newState = state.map((post) => {
        if(post.id === action.id){
          post.voteScore = Number(post.voteScore + action.score)
        }
        return post
      })
      return [...newState]
    default:
      return state
  }
}

export default post