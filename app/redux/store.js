import { configureStore } from '@reduxjs/toolkit'
import defaultExportStudentMappingsReducer from './slices/defaultExportMappings.slice'
import CheckInternetSlice from './slices/Internet.slice'
import loadingSlice from './slices/loading.slice'
import notificationListReducer from './slices/notificationList.slice'
import profileSelelectedReducer from './slices/profileSelected.slice'
import postReducer from './slices/post.slice'
import totalAdvisorReducer from './slices/totalAdvisors.slice'
import totalDepartmentsReducer from './slices/totalDepartments.slice'
import totalExportStudentMappingsReducer from './slices/totalExportMappings.Slice'
import totalSkillsReducer from './slices/totalSkills.slice'

export const store = configureStore({
  reducer: {
    loader: loadingSlice,
    isConnected: CheckInternetSlice,
    totalDepartments: totalDepartmentsReducer,
    totalSkills: totalSkillsReducer,
    totalAdvisors: totalAdvisorReducer,
    totalExportStudentMappings: totalExportStudentMappingsReducer,
    defaultExportStudentMappings: defaultExportStudentMappingsReducer,
    notificationList: notificationListReducer,
    profileSelected: profileSelelectedReducer,
    post: postReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
