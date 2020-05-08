import Credentials from '../interaces/Credentials.interface'
import User from '../interaces/User.interface'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const GET_USER = 'GET_USER'
export const SET_USER = 'SET_USER'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_ERRORS = 'SET_ERRORS'
export const login = (payload: Credentials) => ({
  type: LOGIN,
  payload,
})

export const logout = () => ({
  type: LOGOUT,
})

export const getUser = (payload: { token: string }) => ({
  type: GET_USER,
  payload,
})

export const setUser = (payload: User | null) => ({
  type: SET_USER,
  payload,
})

export const setIsLoading = (payload: boolean) => ({
  type: SET_IS_LOADING,
  payload,
})

export const setErrors = (payload: string[]) => ({
  type: SET_ERRORS,
  payload,
})
