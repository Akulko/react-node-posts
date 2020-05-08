import rootReducer, { history } from './root.reducer'
import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import rootSaga from './root.saga'

const initialState = {}

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const sagaMiddleware = createSagaMiddleware()

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware), applyMiddleware(routerMiddleware(history)))

const store = createStore(rootReducer, initialState, enhancer)

sagaMiddleware.run(rootSaga)

export default store
