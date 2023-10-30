import { createSlice } from '@reduxjs/toolkit'

export const scoreSlice = createSlice({
  name: 'score',
  initialState: {
    value: 0,
    isEnd:false
  },
  reducers: {
    setScore: (state, action) => {
      state.value = action.payload
    },
    setGameEnd:(state,action)=>{
        state.isEnd = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setScore, setGameEnd } = scoreSlice.actions
export const selectScore = (state) => state.score.value
export default scoreSlice.reducer