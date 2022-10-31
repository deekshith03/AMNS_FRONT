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

const signInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('email required'),
  password: Yup.string().required('password required')
})

const SignIn = () => {
  const [email, setEmail] = useState('sample@gmail.com')
  const [password, setPassword] = useState('Sample@2001')
  const [error, setError] = useState({})
  const dispatch = useDispatch()

  const handleSubmit = async () => {
    dispatch(changeState(true))
    const values = {
      email: email,
      password: password
    }
    const isFormValid = await signInSchema.isValid(values, {
      abortEarly: false
    })

    if (isFormValid) {
      axiosInstance
        .post('/api/login', values)
        .then(async (res) => {
          const data = res.data
          await SecureStore.setItemAsync('AccessToken', data.AccessToken)
          await SecureStore.setItemAsync('RefreshToken', data.RefreshToken)
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
      signInSchema.validate(values, { abortEarly: false }).catch((err) => {
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
            {'Proceed With your login'}
          </Text>
          <View style={styles.logintext}>
            <Feather
              name="key"
              size={24}
              color="white"
              style={styles.iconStyles}
            />
            <Text style={styles.headingFont}>{'Login'}</Text>
          </View>
          <View
            style={[globalStyles.inputBoxContainer, styles.inputBoxContainer]}
          >
            <InputBox
              value={email}
              handleChange={setEmail}
              color={colors_dark.textColor}
              placeholder={'Email'}
              keyboardType={'email-address'}
              secureTextEntry={true}
              icon={'user'}
              placeholderTextColor={colors_dark.textColor_dark}
              autoCapitalize={false}
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
              autoCompleteType="password"
              autoCapitalize={false}
              keyboardAppearance="dark"
              error={error.password}
              errorColor={colors_dark.errorColor}
            />
          </View>
        </View>
        <CustomButton
          width="20"
          text="login"
          handleClick={handleSubmit}
          alignItems={'center'}
          backgroundColor={colors.loginpink}
          fontColor={colors.white}
          fontFamily={'Roboto'}
          fontSize={18}
          paddingHorizontal={20}
          paddingVertical={10}
          bordered
          size={'large'}
        />
        <Text style={[globalStyles.LandingFontStyle, styles.forgetPasStyles]}>
          {'forgot password?'}
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
    fontWeight: '900',
    textTransform: 'capitalize'
  },
  iconStyles: { paddingRight: 5 },
  inputBoxContainer: {
    height: 140
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

export default SignIn
