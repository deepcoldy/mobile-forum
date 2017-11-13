export default {
  get: ({
    url,
    success = () => {},
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
    data = {},
    success = () => {},
  }) => {
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
  delete: ({
    url,
    data = {},
    success = () => {},
    error,
  }) => {
    return fetch(
      url,
      {
        method: 'DELETE',
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
  put: ({
    url,
    data = {},
    success = () => { },
    error,
  }) => {
    return fetch(
      url,
      {
        method: 'PUT',
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
  getRandomId(len = 22) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
    const maxPos = chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }
}