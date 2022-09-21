import { Feather } from '@expo/vector-icons'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import globalStyles from '../../styles/global.styles.js'
import { colors, colors_dark } from '../../variables/colors.variables.js'
import { passwordIcon, userIcon } from '../../variables/icons.variable.js'
import { axiosInstance } from '../../variables/variable.js'
import InputBox from '../atoms/input.component.js'
import CustomButton from '../atoms/CustomButton.component.js'
import * as Yup from 'yup'
import { showMessage } from 'react-native-flash-message'

const signInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('email required'),
  password: Yup.string().required('password required')
})

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({})

  const handleSubmit = async () => {
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
        .then((res) => {
          console.log(res.data)
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
  }

  return (
    <View>
      <View>
        <View style={styles.textContainer}>
          <Text style={globalStyles.globalStyles.LandingFontStyle}>
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
            style={[
              globalStyles.globalStyles.inputBoxContainer,
              styles.inputBoxContainer
            ]}
          >
            <InputBox
              value={email}
              handleChange={setEmail}
              color={colors_dark.textColor}
              placeholder={'Email'}
              keyboardType={'email-address'}
              secureTextEntry={true}
              icon={userIcon}
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
              icon={passwordIcon}
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
        <Text
          style={[
            globalStyles.globalStyles.LandingFontStyle,
            styles.forgetPasStyles
          ]}
        >
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
