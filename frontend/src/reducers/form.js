const FORM_STATUS = 'FORM_STATUS';

const form = (state = {
  status: 'normal',
  id: ''
}, action) => {
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