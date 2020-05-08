import { takeEvery, call, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import auth from '../../../api/auth'
import api from '../../../api/api'

import * as actions from './auth.actions'
import { AnyAction } from 'redux'

function* loginSaga({ payload }: AnyAction) {
  yield call(actions.setIsLoading, true)
  const res = yield call(auth.login, payload)
  if (res.error) {
    yield put(actions.setErrors(res.error))
  } else {
    yield put(actions.setUser(res))
    api.defaults.headers.common['Authorization'] = res.token
    window.localStorage.setItem('token', res.token)
    yield put(push('posts'))
  }
  yield call(actions.setIsLoading, false)
}

function* logoutSaga() {
  window.localStorage.setItem('token', '')
  delete api.defaults.headers.common['Authorization']
  yield put(actions.setUser(null))
}

function* getUserSaga({ payload }: AnyAction) {
  const res = yield call(auth.getUser, payload)
  if (res.error) {
    yield put(actions.setErrors(res.error))
  } else {
    yield put(actions.setUser(res))
    api.defaults.headers.common['Authorization'] = res.token
    yield put(push('posts'))
  }
}

export default function* authSaga() {
  yield takeEvery(actions.LOGIN, loginSaga)
  yield takeEvery(actions.GET_USER, getUserSaga)
  yield takeEvery(actions.LOGOUT, logoutSaga)
}
