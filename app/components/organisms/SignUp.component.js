import { Feather } from '@expo/vector-icons'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { changeState } from '../../redux/slices/loading.slice.js'
import globalStyles from '../../styles/global.styles.js'
import { colors, colors_dark } from '../../variables/colors.variables.js'
import { axiosInstance } from '../../variables/variable.js'
import InputBox from '../atoms/input.component.js'
import CustomButton from '../molecules/CustomButton.component.js'
const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, reSetPassword] = useState('')
  const [name, setName] = useState('')
  const dispatch = useDispatch()
  const handleSubmit = async () => {
    dispatch(changeState(true))
    const data = {
      email: email,
      name: name,
      password: password
    }
    await axiosInstance
      .post('/api/register', data)
      .then((res) => {
        console.log(res.data)
      })
      .catch((error) => console.log('error >> ', error.response.data))
    dispatch(changeState(false))
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
              icon={'user'}
              placeholderTextColor={colors_dark.textColor_dark}
              autoCapitalize={true}
            />
            <InputBox
              value={email}
              handleChange={setEmail}
              color={colors_dark.textColor}
              placeholder={'Email'}
              keyboardType={'email-address'}
              icon={'mail'}
              placeholderTextColor={colors_dark.textColor_dark}
            />
            <InputBox
              value={password}
              handleChange={setPassword}
              color={colors_dark.textColor}
              placeholder={'Password'}
              icon={'lock'}
              placeholderTextColor={colors_dark.textColor_dark}
              secureTextEntry={true}
            />
            <InputBox
              value={rePassword}
              handleChange={reSetPassword}
              color={colors_dark.textColor}
              placeholder={'Retype password'}
              icon={'user-check'}
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
