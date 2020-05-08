import React from 'react'
import { AppBar, Toolbar, Typography, Button, Snackbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { userSelector, errorsSelector } from './views/auth/store/auth.selectors'
import { useSelector, useDispatch } from 'react-redux'
import { logout, setErrors } from './views/auth/store/auth.actions'

interface IProps {
  children: React.ReactNode
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    alignItems: 'flex-start',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  email: {
    fontWeight: 400,
  },
}))

const Layout = ({ children }: IProps) => {
  const classes = useStyles()
  const user = useSelector(userSelector)
  const errors = useSelector(errorsSelector)
  const dispatch = useDispatch()
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            React Node Posts
          </Typography>
          {
            <Typography variant="h6" className={classes.email}>
              {user && user.user.email}
            </Typography>
          }
          {user && (
            <Button color="inherit" onClick={() => dispatch(logout())}>
              {'Logout'}
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {children}
      <Snackbar
        open={!!errors.length}
        autoHideDuration={3000}
        onClose={() => dispatch(setErrors([]))}
        message={errors}
      ></Snackbar>
    </div>
  )
}

export default Layout
