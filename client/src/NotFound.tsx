import React from 'react'
import { Container } from '@material-ui/core'
import { Button, Box } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

const Templates = () => {
  const history = useHistory()
  const useStyles = makeStyles(theme => ({
    root: {
      alignItems: 'center',
      padding: theme.spacing(2),
    },
    content: {
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
    <Container maxWidth="sm" className={classes.root}>
      <Box className={classes.content} display="flex" flexDirection="column" justifyContent="center">
        <span>404</span>
        <Button variant="contained" color="primary" onClick={() => history.push('/posts')}>
          Get back
        </Button>
      </Box>
    </Container>
  )
}

export default Templates
