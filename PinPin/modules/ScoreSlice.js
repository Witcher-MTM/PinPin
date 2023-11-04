import { createSlice } from '@reduxjs/toolkit'

export const scoreSlice = createSlice({
  name: 'score',
  initialState: {
    value: 0,
    historyValue:[],
    valueWhenOut:0,
    isEnd:false,
    isWin:false,
    isAuto:false
  },
  reducers: {
    setScore: (state, action) => {
      state.value = action.payload
    },
    setHistoryScore:(state,action)=>{
      state.historyValue.push(action.payload)
    },
    setGameEnd:(state,action)=>{
        state.isEnd = action.payload
    },
    setisWin:(state,action)=>{
      state.isWin = action.payload
  },
  setValueWhenOut:(state,action)=>{
    state.valueWhenOut = action.payload
},
  setisAuto:(state,action)=>{
    state.isAuto = action.payload
},
  },
})

// Action creators are generated for each case reducer function
export const { setScore, setGameEnd, setisWin, setHistoryScore, setisAuto, setValueWhenOut } = scoreSlice.actions
export const selectScore = (state) => state.score.value
export default scoreSlice.reducer