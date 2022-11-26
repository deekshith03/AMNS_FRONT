import { configureStore } from '@reduxjs/toolkit'
import loadingSlice from './slices/loading.slice'
import CheckInternetSlice from './slices/Internet.slice'
import totalDepartmentsReducer from './slices/totalDepartments.slice'
import totalSkillsReducer from './slices/totalSkills.slice'
import totalAdvisorReducer from './slices/totalAdvisors.slice'
import totalExportStudentMappingsReducer from './slices/totalExportMappings.Slice'
import defaultExportStudentMappingsReducer from './slices/defaultExportMappings.slice'

export const store = configureStore({
  reducer: {
    loader: loadingSlice,
    isConnected: CheckInternetSlice,
    totalDepartments: totalDepartmentsReducer,
    totalSkills: totalSkillsReducer,
    totalAdvisors: totalAdvisorReducer,
    totalExportStudentMappings: totalExportStudentMappingsReducer,
    defaultExportStudentMappings: defaultExportStudentMappingsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
