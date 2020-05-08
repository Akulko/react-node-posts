import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Button, TextField, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { login } from './store/auth.actions'
import { isLoadingSelector } from './store/auth.selectors'

const Login = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector(isLoadingSelector)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const useStyles = makeStyles(theme => ({
    root: {
      alignItems: 'center',
    },
    form: {
      flexGrow: 1,
      height: '80vh',
      alignItems: 'center',
      display: 'flex',
    },
    button: {
      marginRight: theme.spacing(2),
      margin: '20px',
    },
    title: {
      flexGrow: 1,
    },
  }))

  const classes = useStyles()

  return (
    <Container className={classes.root} maxWidth="sm">
      <form className={classes.form} noValidate autoComplete="off">
        <Grid container direction="column">
          <TextField required label="Email" onChange={e => setEmail(e.target.value)} />
          <TextField required label="Password" type="password" onChange={e => setPassword(e.target.value)} />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            disabled={isLoading}
            onClick={() => dispatch(login({ email, password }))}
          >
            Login
          </Button>
        </Grid>
      </form>
    </Container>
  )
}

export default Login
