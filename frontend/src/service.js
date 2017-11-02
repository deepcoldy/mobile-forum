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
    )
    .then(res => res.json())    
    .then((resp) => {
      success(resp)
    })
  },
  post: ({
    url,
    data,
    success,
    error,
  }) => {
    console.log(data)
    return fetch(
      url,
      {
        method: 'POST',
        headers: {
          'Authorization': 'DeepCold',
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      }
    )
    .then(res => res.json())    
    .then((resp) => {
      success(resp)
    })
  },
}