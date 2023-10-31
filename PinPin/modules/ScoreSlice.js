import { createSlice } from '@reduxjs/toolkit'

export const scoreSlice = createSlice({
  name: 'score',
  initialState: {
    value: [],
    isEnd:false,
    isGameNow:false
  },
  reducers: {
    setScore: (state, action) => {
      state.value.push(action.payload)
    },
    setGameEnd:(state,action)=>{
        state.isEnd = action.payload
    },
    setIsGame:(state,action)=>{
      state.isGameNow = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setScore, setGameEnd, setIsGame } = scoreSlice.actions
export const selectScore = (state) => state.score.value
export default scoreSlice.reducer