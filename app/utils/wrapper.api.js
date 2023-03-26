import { showMessage } from 'react-native-flash-message'
// import { useDispatch } from 'react-redux'
// import { changeState } from '../redux/slices/loading.slice'

export const apiWrapper = async (func, ...args) => {
  // const dispatch = useDispatch()

  // dispatch(changeState(true))
  try {
    await func(...args)
  } catch (error) {
    const statusCode = error.response ? error.response.status : null

    if (statusCode === 500 || statusCode === 400) {
      const errMsg =
        error.response.data.errors[0].message === undefined
          ? error.response.data.errors[0].msg
          : error.response.data.errors[0].message

      showMessage({
        message: errMsg,
        type: 'danger',
        position: 'bottom'
      })

      console.log(errMsg)
    } else {
      error.handleGlobally && error.handleGlobally()
    }
  }
  // dispatch(changeState(false))
}
