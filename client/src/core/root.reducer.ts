import { combineReducers } from 'redux'

import postsReducer from '../views/posts/store/posts.reducers'
import authReducer from '../views/auth/store/auth.reducers'
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

const store = combineReducers({
  router: connectRouter(history),
  posts: postsReducer,
  auth: authReducer,
})

export default store
