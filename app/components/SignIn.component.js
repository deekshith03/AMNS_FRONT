import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import CustomButton from '../components/CustomButton.component.js'
import globalStyles from '../styles/global.styles.js'
import { colors } from '../variables/colors.variables.js'

const SignIn = () => {
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
          {/* <View>//text inputs go here</View> */}
        </View>
        <CustomButton text="login" />
        <Text
          style={[
            globalStyles.globalStyles.LandingFontStyle,
            styles.forgetPasStyles
          ]}
        >
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
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },

  iconStyles: { paddingRight: 5 },
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
