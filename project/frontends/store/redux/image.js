import { createSlice } from '@reduxjs/toolkit'

const imageSlice = createSlice({
  name: 'image',
  initialState: {
    ids: [],
  },
  reducers: {
    addImage: (state, action) => {
      state.ids.push(action.payload.id)
    },
    removeImage: (state, action) => {
      state.ids.splice(state.ids.indexOf(action.payload.id), 1)
    },
  },
})

export const addImage = imageSlice.actions.addImage
export const removeImage = imageSlice.actions.removeImage
export default imageSlice.reducer
