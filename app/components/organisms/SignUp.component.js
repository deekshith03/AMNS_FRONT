import { Feather } from '@expo/vector-icons'
import axios from 'axios'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CustomButton from '../molecules/CustomButton.component.js'
import globalStyles from '../../styles/global.styles.js'
import { colors, colors_dark } from '../../variables/colors.variables.js'
import {
  emailIcon,
  passwordIcon,
  rePasswordIcon,
  userIcon
} from '../../variables/icons.variable.js'
import InputBox from '../atoms/input.component.js'
const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, reSetPassword] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = async () => {
    const res = await axios({
      method: 'post',
      url: '/api/register',
      data: {
        email: email,
        name: name,
        password: password
      }
    })
    console.log(res)
  }
  return (
    <View>
      <View>
        <View style={styles.textContainer}>
          <Text style={globalStyles.globalStyles.LandingFontStyle}>
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
            style={[
              globalStyles.globalStyles.inputBoxContainer,
              styles.inputBoxContainer
            ]}>
            <InputBox
              value={name}
              handleChange={setName}
              color={colors_dark.textColor}
              placeholder={'Name'}
              icon={userIcon}
              placeholderTextColor={colors_dark.textColor_dark}
              autoCapitalize={true}
            />
            <InputBox
              value={email}
              handleChange={setEmail}
              color={colors_dark.textColor}
              placeholder={'Email'}
              keyboardType={'email-address'}
              icon={emailIcon}
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
            <InputBox
              value={rePassword}
              handleChange={reSetPassword}
              color={colors_dark.textColor}
              placeholder={'Retype password'}
              icon={rePasswordIcon}
              placeholderTextColor={colors_dark.textColor_dark}
              secureTextEntry={true}
            />
          </View>
        </View>
        <CustomButton text="signup" handleClick={handleSubmit} />
        <Text
          style={[
            globalStyles.globalStyles.LandingFontStyle,
            styles.forgetPasStyles
          ]}>
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
