export const GET_POSTS = 'GET_POSTS'
export const PUT_POSTS = 'PUT_POSTS'
export const SET_IS_FETCHING = 'SET_IS_FETCHING'

export const getPosts = () => ({
  type: GET_POSTS,
})

export const putPosts = (payload: any) => ({
  type: PUT_POSTS,
  payload,
})

export const setIsFetching = (payload: boolean) => ({
  type: SET_IS_FETCHING,
  payload,
})
