export default {
  get: ({
    url,
    success,
    error,
  }) => {
    return fetch(
      url,
        {
            headers: { 'Authorization': 'DeepCold' }
        }
    ).then((resp) => {
      success(resp)
    })
  },
}