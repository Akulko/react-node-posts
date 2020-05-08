import { createSelector } from 'reselect'

const postsSelector = (state: any) => state.posts

export const postsListSelector = createSelector(
  postsSelector,
  posts => posts.list
)

export const isFetchingSelector = createSelector(
  postsSelector,
  posts => posts.isFetching
)
