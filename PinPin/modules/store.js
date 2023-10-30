import { configureStore } from '@reduxjs/toolkit'
import ScoreReducer from './ScoreSlice'

export default configureStore({
  reducer: {
    score:ScoreReducer    
  },
})