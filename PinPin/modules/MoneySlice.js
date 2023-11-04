import { createSlice } from '@reduxjs/toolkit'

export const moneySlice = createSlice({
  name: 'money',
  initialState: {
    value: 0,
    winValue:0,
  },
  reducers: {
    setMoney: (state, action) => {
      state.value = action.payload
    },
    setwinValue: (state, action) => {
      state.winValue = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setMoney, setwinValue } = moneySlice.actions
export default moneySlice.reducer