import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import CustomButton from '../../components/atoms/CustomButton.component'
import InputBox from '../../components/atoms/input.component'
import { Title } from '../../components/atoms/Title.atom'
import { changeState } from '../../redux/slices/loading.slice'
import { colors } from '../../variables/colors.variables'
import { axiosInstance } from '../../variables/variable'

export const AddStaff = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState({})
  const dispatch = useDispatch()

  const formSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email Required'),
    name: Yup.string()
      .matches(/^[A-Za-z ]+$/, 'Enter a valid name')
      .max(40)
      .min(2)
      .required()
  })

  const handleSubmit = async () => {
    dispatch(changeState(true))
    const values = {
      email: email,
      name: name,
      password:
        name.substring(0, 4) + '@' + new Date().getFullYear().toString(),
      type: 'staff'
    }

    const isFormValid = await formSchema.isValid(values, {
      abortEarly: false
    })

    if (isFormValid) {
      axiosInstance
        .post('/api/addStaff', { staffs: [values] })
        .then(async (res) => {
          showMessage({
            message: res.data.message,
            type: 'success',
            position: 'bottom'
          })
        })
        .catch((error) => {
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
          } else {
            error.handleGlobally && error.handleGlobally()
          }
        })
    } else {
      formSchema.validate(values, { abortEarly: false }).catch((err) => {
        const errors = err.inner.reduce((acc, error) => {
          return {
            ...acc,
            [error.path]: error.errors[0]
          }
        }, {})

        setError(errors)

        let len = Object.entries(errors).length

        if (len > 0) {
          showMessage({
            message: Object.values(errors)[0],
            type: 'danger',
            position: 'bottom'
          })
        }
      })
    }
    dispatch(changeState(false))
  }
  return (
    <View style={[styles.container]}>
      <Title text="Register Staff" />
      <View style={styles.inputDiv}>
        <InputBox
          value={email}
          handleChange={setEmail}
          placeholder={'Email'}
          textContentType="email"
          type="box"
          keyboardType={'email-address'}
          secureTextEntry={true}
          placeholderTextColor={colors.textColor_dark}
          autoCapitalize={false}
          autoCompleteType="email"
          keyboardAppearance="dark"
          error={error.email}
          errorColor={colors.errorColor}
          autofocus={true}
        />
        <InputBox
          value={name}
          handleChange={setName}
          placeholder={'Name'}
          type="box"
          placeholderTextColor={colors.textColor_dark}
          autoCapitalize={true}
          autoCompleteType="name"
          keyboardAppearance="dark"
          error={error.name}
          errorColor={colors.errorColor}
        />
        <CustomButton
          text="Add"
          handleClick={handleSubmit}
          alignItems="center"
          backgroundColor={colors.loginPink}
          fontColor={colors.white}
          fontFamily={'Roboto'}
          fontSize={18}
          paddingHorizontal={20}
          paddingVertical={10}
          bordered
          size={'large'}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: 15,
    top: 120
  },
  inputDiv: {
    alignContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: 200,
    justifyContent: 'space-evenly',
    marginVertical: 20,
    width: '100%'
  }
})
