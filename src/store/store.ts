import { configureStore } from '@reduxjs/toolkit'
import { moviesSlice, genresSlice, actorsSlice } from './'
// ...

export const store = configureStore({
  reducer: {
        movies: moviesSlice.reducer,
        genres: genresSlice.reducer,
        actors: actorsSlice.reducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch