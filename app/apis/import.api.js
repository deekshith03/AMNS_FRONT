import { axiosInstance } from '../variables/variable'

export const generateJSON = (data, headerNumber, success_func) => {
  axiosInstance.defaults.headers.put['Content-Type'] = 'multipart/form-data'
  axiosInstance.defaults.headers.put['mimeType'] = 'multipart/form-data'

  axiosInstance
    .post(`api/import/generate-json/${headerNumber}`, data)
    .then((res) => {
      success_func(res)
    })
}

export const saveExcelData = (data, success_func) => {
  let total = data.excelData.length
  const limit = 120
  let start = 0
  let end = limit
  let success = true

  let savedDocs = 0
  let errorDocs = []
  while (total > 0) {
    const payload = {
      headerMappings: data.headerMappings,
      excelData: data.excelData.slice(start, end)
    }
    axiosInstance.post('api/import/save', payload).then((res) => {
      success = res.data.success
      savedDocs += res.data.savedDocs
      errorDocs = [...errorDocs, res.data.errorDocs]
    })
    start = end
    end = end + limit
    total = total - limit
  }

  success_func(success, savedDocs, errorDocs)
}
