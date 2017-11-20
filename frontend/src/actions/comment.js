import { VOTE_COMMENT, DELETE_COMMENT } from "../reducers/comment";

export const voteCommentAction = (id, score) => {
  return {
    type: VOTE_COMMENT,
    id,
    score
  }
}

export const deleteCommentAction = (id) => {
  return {
    type: DELETE_COMMENT,
    id
  }
}