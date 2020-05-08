import { fork } from 'redux-saga/effects'

import postsSagas from '../views/posts/store/posts.sagas'
import authSagas from '../views/auth/store/auth.sagas'

export default function* rootSaga() {
  yield fork(postsSagas)
  yield fork(authSagas)
}
