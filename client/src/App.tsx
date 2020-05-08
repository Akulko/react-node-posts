import React from 'react'
import { Provider } from 'react-redux'
import store from './core/store'
import { ConnectedRouter } from 'connected-react-router'
import Layout from './Layout'
import Router from './Router'
import { history } from './core/root.reducer'
import { getUser } from './views/auth/store/auth.actions'
const token = window.localStorage.getItem('token')
if (token) {
  store.dispatch(getUser({ token }))
}
const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Layout>
          <Router />
        </Layout>
      </ConnectedRouter>
    </Provider>
  )
}

export default App
