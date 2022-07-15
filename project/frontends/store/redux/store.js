import { configureStore } from '@reduxjs/toolkit'

import imageReducer from './image'

export const store = configureStore({
  reducer: {
    imageMeels: imageReducer,
  },
})
