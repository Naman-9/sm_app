import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './features/api/authApi'
import { postsApi } from './features/api/postsApi'
import authReducer from './features/auth/authSlice'
import postsReducer from './features/posts/postSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      [authApi.reducerPath]:authApi.reducer,
      [postsApi.reducerPath]:postsApi.reducer,
      auth: authReducer,
      posts: postsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware, postsApi.middleware)
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']


