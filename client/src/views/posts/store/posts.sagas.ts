import { takeEvery, call, put } from 'redux-saga/effects'
import posts from '../../../api/posts'

import * as actions from './posts.actions'

function* getPostsSaga() {
  yield put(actions.setIsFetching(true))
  const res = yield call(posts.fetchPosts)
  yield put(actions.putPosts(res))
  yield put(actions.setIsFetching(false))
}

export default function* postsSaga() {
  yield takeEvery(actions.GET_POSTS, getPostsSaga)
}
