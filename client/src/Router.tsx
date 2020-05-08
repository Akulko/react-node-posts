import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import LoginPage from './views/auth/login.component'
import PostsPage from './views/posts/posts.component'
import NotFoundPage from './NotFound'
import { useSelector } from 'react-redux'
import { userSelector } from './views/auth/store/auth.selectors'

interface IProps {
  children: React.ReactNode
  path: string | string[]
}
const PrivateRoute = ({ children, ...rest }: IProps) => {
  const isLoggedIn = useSelector(userSelector)

  return (
    <Route
      {...rest}
      render={props => {
        return isLoggedIn ? children : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      }}
    />
  )
}

export default () => (
  <Switch>
    <Route path="/login" component={LoginPage} />
    <PrivateRoute path={['/', '/posts']}>
      <PostsPage />
    </PrivateRoute>
    <Route path="*" exact={true} component={NotFoundPage} />
  </Switch>
)
