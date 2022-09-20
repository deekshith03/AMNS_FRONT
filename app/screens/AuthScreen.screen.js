import React, { useState } from 'react'
import { Image, ImageBackground, StyleSheet, View } from 'react-native'
import ImageCustomButton from '../components/ImageCustomButton.component.js'
import LoginOptions from '../components/LoginOptions.component.js'
import SignIn from '../components/SignIn.component.js'
import SignUp from '../components/SignUp.component.js'
import globalStyles from '../styles/global.styles.js'
import { colors } from '../variables/colors.variables.js'
import { logo } from '../variables/paths.variables.js'
const bgImage = require('../assets/images/loginbg.jpg')
const AuthScreen = () => {
  const [isShowingSignIn, setIsShowingSignIn] = useState(true)

  const handleShowingSignUp = () => {
    setIsShowingSignIn((isShowingSignIn) => !isShowingSignIn)
  }

  return (
    <View style={globalStyles.globalStyles.container}>
      <ImageBackground source={bgImage} resizeMode="cover" style={styles.image}>
        <View style={styles.darkness} />
        <View style={styles.body}>
          <View style={styles.logo}>
            <Image source={logo} />
          </View>
          {isShowingSignIn === true ? <SignIn /> : <SignUp />}
          <View style={styles.ImageBtnContainer}>
            <ImageCustomButton
              text="sign in"
              iconName="key"
              flag={isShowingSignIn}
              handleShowingSignUp={handleShowingSignUp}
            />
            <ImageCustomButton
              text="sign up"
              iconName="edit-2"
              flag={!isShowingSignIn}
              handleShowingSignUp={handleShowingSignUp}
            />
          </View>
        </View>
      </ImageBackground>
      <LoginOptions />
    </View>
  )
}

const styles = StyleSheet.create({
  ImageBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    top: 30,
    zIndex: -1
  },
  body: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: 35,
    paddingRight: 35,
    zIndex: 1
  },

  darkness: {
    backgroundColor: colors.darkScreen,
    height: '100%',
    position: 'absolute',
    width: '100%',
    zIndex: 0
  },

  image: {
    maxWidth: '100%',
    zIndex: -1
  },
  logo: {
    alignSelf: 'center',
    marginTop: '15%'
  }
})

export default AuthScreen
