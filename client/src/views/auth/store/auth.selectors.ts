import { createSelector } from 'reselect'

const authSelector = (state: any) => state.auth

export const userSelector = createSelector(
  authSelector,
  auth => auth.user
)

export const errorsSelector = createSelector(
  authSelector,
  auth => auth.errors
)

export const isLoadingSelector = createSelector(
  authSelector,
  auth => auth.isLoading
)
