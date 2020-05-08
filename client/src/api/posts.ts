import api from './api'

const fetchPosts = () => {
  return api.get('/posts')
}

export default {
  fetchPosts,
}
