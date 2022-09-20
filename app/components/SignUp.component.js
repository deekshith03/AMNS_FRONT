import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import CustomButton from '../components/CustomButton.component.js'
import globalStyles from '../styles/global.styles.js'
import { colors } from '../variables/colors.variables.js'
const SignUp = () => {
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
          {/* <View>//text inputs go here</View> */}
        </View>
        <CustomButton text="signup" />
        <Text
          style={[
            globalStyles.globalStyles.LandingFontStyle,
            styles.forgetPasStyles
          ]}
        >
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
