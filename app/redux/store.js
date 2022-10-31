import { configureStore } from '@reduxjs/toolkit'
import loadingSlice from './slices/loading.slice'
import CheckInternetSlice from './slices/Internet.slice'
import totalDepartmentsReducer from './slices/totalDepartments.slice'
import totalSkillsReducer from './slices/totalSkills.slice'
import totalAdvisorReducer from './slices/totalAdvisors.slice'

export const store = configureStore({
  reducer: {
    loader: loadingSlice,
    isConnected: CheckInternetSlice,
    totalDepartments: totalDepartmentsReducer,
    totalSkills: totalSkillsReducer,
    totalAdvisors: totalAdvisorReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
