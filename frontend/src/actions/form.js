import { FORM_STATUS } from "../reducers/form";

export const initFormStatusAction = () => {
  return {
    type: FORM_STATUS,
    status: 'normal',
    id: '',
  }
}

export const editPostStatusAction = (id) => {
  return {
    type: FORM_STATUS,
    status: 'edit_post',
    id,
  }
}

export const editCommentStatusAction = (id) => {
  return {
    type: FORM_STATUS,
    status: 'edit_comment',
    id,
  }
}