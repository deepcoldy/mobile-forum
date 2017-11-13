const UPDATE_COMMENT = 'UPDATE_COMMENT'
const VOTE_COMMENT = 'VOTE_COMMENT'
const ADD_COMMENT = 'ADD_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'
const EDIT_COMMENT = 'EDIT_COMMENT'

const comment = (state = [], action) => {
  switch (action.type) {
    case UPDATE_COMMENT:
      return action.data
    case VOTE_COMMENT:
      const newComment = state.map((comment) => {
        if(comment.id === action.id){
          comment.voteScore = Number(comment.voteScore + action.score)
        }
        return comment
      })
      return [...newComment]
    case ADD_COMMENT:
      return [...state, action.data]
    case DELETE_COMMENT:
      return [...state.map((comment) => {
        if (comment.id === action.id) {
          comment.deleted = true
        }
        return comment
      })]
    case EDIT_COMMENT:
      return [...state.map((comment) => {
        if (comment.id === action.id) {
          comment.body = action.body
        }
        return comment
      })]
    default:
      return state
  }
}

export default comment