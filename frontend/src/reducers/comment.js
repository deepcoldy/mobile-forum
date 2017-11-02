const UPDATE_COMMENT = 'UPDATE_COMMENT'
const VOTE_COMMENT = 'VOTE_COMMENT'

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
    default:
      return state
  }
}

export default comment