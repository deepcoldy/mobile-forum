const INITIAL_STATE = {
  status: 'normal',
  id: ''
}
export const FORM_STATUS = 'FORM_STATUS';

const form = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FORM_STATUS:
      return {
        status: action.status,
        id: action.id
      }
    default:
      return state
  }
}

export default form