import { configureStore } from '@reduxjs/toolkit'
import ScoreReducer from './ScoreSlice'
import MoneySlice from './MoneySlice'

export default configureStore({
  reducer: {
    score:ScoreReducer,
    money:MoneySlice    
  },
})