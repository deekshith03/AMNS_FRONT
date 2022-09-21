import { Feather } from '@expo/vector-icons'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { changeState } from '../../redux/slices/loading.slice.js'
import globalStyles from '../../styles/global.styles.js'
import { colors, colors_dark } from '../../variables/colors.variables.js'
import { passwordIcon, userIcon } from '../../variables/icons.variable.js'
import { axiosInstance } from '../../variables/variable.js'
import InputBox from '../atoms/input.component.js'
import CustomButton from '../molecules/CustomButton.component.js'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const handleSubmit = async () => {
    dispatch(changeState(true))
    const data = {
      email: email,
      password: password
    }
    await axiosInstance
      .post('/api/login', data)
      .then((res) => {
        console.log('res.data >> ', res.data)
      })
      .catch((error) => console.log('error >> ', error.response.data))

    dispatch(changeState(false))
  }

  return (
    <View>
      <View>
        <View style={styles.textContainer}>
          <Text style={globalStyles.globalStyles.LandingFontStyle}>
            Proceed With your login
          </Text>
          <View style={styles.logintext}>
            <Feather
              name="key"
              size={24}
              color="white"
              style={styles.iconStyles}
            />
            <Text style={styles.headingFont}>Login</Text>
          </View>
          <View
            style={[
              globalStyles.globalStyles.inputBoxContainer,
              styles.inputBoxContainer
            ]}>
            <InputBox
              value={email}
              handleChange={setEmail}
              color={colors_dark.textColor}
              placeholder={'Email'}
              keyboardType={'email-address'}
              secureTextEntry={true}
              icon={userIcon}
              placeholderTextColor={colors_dark.textColor_dark}
            />
            <InputBox
              value={password}
              handleChange={setPassword}
              color={colors_dark.textColor}
              placeholder={'Password'}
              icon={passwordIcon}
              placeholderTextColor={colors_dark.textColor_dark}
              secureTextEntry={true}
            />
          </View>
        </View>
        <CustomButton text="login" handleClick={handleSubmit} />
        <Text
          style={[
            globalStyles.globalStyles.LandingFontStyle,
            styles.forgetPasStyles
          ]}>
          forgot password?
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
