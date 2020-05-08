import api from './api'
import Credentials from '../views/auth/interaces/Credentials.interface'

const login = (credentials: Credentials) => {
  return api.post('/login', credentials)
}

const getUser = (token: { token: string }) => {
  return api.post('/get-user', token)
}

export default {
  login,
  getUser,
}
