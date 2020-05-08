import { PUT_POSTS, SET_IS_FETCHING } from './posts.actions'
import Post from '../interaces/Post.interface'

export type InitialState = {
  list: Post[]
  isFetching: Boolean
}

const initialState: any = {
  list: [],
  isFetching: false,
}

const listReducer = (state: InitialState = initialState, action: any) => {
  switch (action.type) {
    case PUT_POSTS:
      return { ...state, list: action.payload }
    case SET_IS_FETCHING:
      return { ...state, isFetching: action.payload }
    default:
      return state
  }
}

export default listReducer
