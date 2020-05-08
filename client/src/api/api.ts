import axios from 'axios'

const api = axios.create()

//FIXME: Add env const
api.interceptors.request.use(
  async config => {
    config.baseURL = 'http://localhost:8000'
    return config
  },
  error => Promise.reject(error)
)

api.interceptors.response.use(response => response.data, error => Promise.reject(error))

export default api
