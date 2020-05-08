import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from './store/posts.actions'
import { postsListSelector, isFetchingSelector } from './store/posts.selectors'
import Post from './interaces/Post.interface'
import { Grid, Box, Button, CircularProgress } from '@material-ui/core'
import PostCard from './post.component'

const Posts = () => {
  const dispatch = useDispatch()

  const posts = useSelector(postsListSelector)
  const isFetching = useSelector(isFetchingSelector)

  return (
    <Grid container direction="column" justify="center">
      <Box m={2} display="flex" alignItems="center">
        <Box flexGrow="1">
          <Button variant="contained" color="primary" disabled={isFetching} onClick={() => dispatch(getPosts())}>
            Get posts
          </Button>
        </Box>
        {isFetching && <CircularProgress />}
      </Box>

      {!isFetching && posts.map((i: Post) => <PostCard key={i.id} title={i.title} body={i.body} />)}
    </Grid>
  )
}

export default Posts
