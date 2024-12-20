import { Feather } from '@expo/vector-icons'
import * as SecureStore from 'expo-secure-store'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import * as RootNavigation from '../../navigator/RootNavigation.navigator'
import { changeState } from '../../redux/slices/loading.slice.js'
import globalStyles from '../../styles/global.styles.js'
import { colors, colors_dark } from '../../variables/colors.variables.js'
import { axiosInstance } from '../../variables/variable.js'
import CustomButton from '../atoms/CustomButton.component.js'
import InputBox from '../atoms/input.component.js'
const signupSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z ]+$/, 'Enter a valid name')
    .max(40)
    .min(2)
    .required(),
  email: Yup.string().email('Invalid email').required('Email Required'),
  password: Yup.string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'password must contain 8 characters, one Uppercase, one Lowercase, one Number and one special case character'
    ),
  rePassword: Yup.string()
    .label('Password Confirm')
    .required()
    .oneOf([Yup.ref('password')], 'Passwords does not match')
})

const SignUp = () => {
  const [email, setEmail] = useState('sample@gmail.com')
  const [password, setPassword] = useState('Sample@2001')
  const [rePassword, reSetPassword] = useState('Sample@2001')
  const [name, setName] = useState('sample')
  const [error, setError] = useState({})
  const dispatch = useDispatch()

  const handleSubmit = async () => {
    dispatch(changeState(true))
    const values = {
      email: email,
      password: password,
      rePassword: rePassword,
      name: name
    }
    const isFormValid = await signupSchema.isValid(values, {
      abortEarly: false
    })

    if (isFormValid) {
      axiosInstance
        .post('/api/register', values)
        .then(async (res) => {
          const data = res.data
          await SecureStore.setItemAsync('AccessToken', data.AccessToken)
          await SecureStore.setItemAsync('RefreshToken', data.RefreshToken)
          await SecureStore.setItemAsync('type', data.type)
          RootNavigation.navigate('Home')
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
      signupSchema.validate(values, { abortEarly: false }).catch((err) => {
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
    <View>
      <View>
        <View style={styles.textContainer}>
          <Text style={globalStyles.LandingFontStyle}>
            Proceed With your registration
          </Text>
          <View style={styles.logintext}>
            <Feather
              name="lock"
              size={24}
              color="white"
              style={styles.iconStyles}
            />
            <Text style={styles.headingFont}>Signup</Text>
          </View>
          <View
            style={[globalStyles.inputBoxContainer, styles.inputBoxContainer]}
          >
            <InputBox
              value={name}
              handleChange={setName}
              color={colors_dark.textColor}
              placeholder={'Name'}
              icon={'user'}
              placeholderTextColor={colors_dark.textColor_dark}
              autoCapitalize={true}
              keyboardAppearance="dark"
              error={error.name}
              errorColor={colors_dark.errorColor}
            />
            <InputBox
              value={email}
              handleChange={setEmail}
              color={colors_dark.textColor}
              placeholder={'Email'}
              keyboardType={'email-address'}
              icon={'mail'}
              placeholderTextColor={colors_dark.textColor_dark}
              autoCompleteType="email"
              keyboardAppearance="dark"
              error={error.email}
              errorColor={colors_dark.errorColor}
            />
            <InputBox
              value={password}
              handleChange={setPassword}
              color={colors_dark.textColor}
              placeholder={'Password'}
              icon={'lock'}
              placeholderTextColor={colors_dark.textColor_dark}
              secureTextEntry={true}
              autoCapitalize={false}
              keyboardAppearance="dark"
              error={error.password}
              errorColor={colors_dark.errorColor}
            />
            <InputBox
              value={rePassword}
              handleChange={reSetPassword}
              color={colors_dark.textColor}
              placeholder={'Retype password'}
              icon={'user-check'}
              placeholderTextColor={colors_dark.textColor_dark}
              secureTextEntry={true}
              autoCapitalize={false}
              keyboardAppearance="dark"
              error={error.rePassword}
              errorColor={colors_dark.errorColor}
            />
          </View>
        </View>
        <CustomButton
          text="signup"
          handleClick={handleSubmit}
          alignItems={'center'}
          backgroundColor={colors.loginPink}
          fontColor={colors.white}
          fontFamily={'Roboto'}
          fontSize={18}
          paddingHorizontal={20}
          paddingVertical={10}
          bordered
          size={'large'}
        />
        <Text style={[globalStyles.LandingFontStyle, styles.forgetPasStyles]}>
          Already Have an Account?
        </Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  forgetPasStyles: {
    paddingVertical: 40,
    textAlign: 'center'
  },

  headingFont: {
    color: colors.white,
    fontFamily: 'Roboto',
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },

  iconStyles: {
    paddingRight: 5
  },
  inputBoxContainer: {
    height: 230
  },
  logintext: {
    flexDirection: 'row',
    fontWeight: 500,
    paddingTop: 12
  },
  textContainer: {
    paddingTop: 38
  }
})
export default SignUp
