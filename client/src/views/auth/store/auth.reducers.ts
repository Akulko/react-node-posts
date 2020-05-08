import { SET_USER, SET_IS_LOADING, LOGOUT, SET_ERRORS } from './auth.actions'
import Credentials from '../interaces/Credentials.interface'

export type InitialState = {
  user: Credentials | null
  isLoading: Boolean
  errors: string[]
}

const initialState: InitialState = {
  user: null,
  isLoading: false,
  errors: [],
}

const userReducer = (state: InitialState = initialState, action: any) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload }
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload }
    case SET_ERRORS:
      return { ...state, errors: action.payload }
    case LOGOUT:
      return { ...state, user: null }
    default:
      return state
  }
}

export default userReducer
