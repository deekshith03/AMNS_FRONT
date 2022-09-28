import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import globalStyles from '../styles/global.styles'
import { colors } from '../variables/colors.variables'
import { noInternetImage } from '../variables/paths.variables'

export const NoInternet = () => {
  return (
    <View style={styles.container}>
      <Image source={noInternetImage} style={styles.Image} />
      <View style={styles.textContainer}>
        <Text style={[globalStyles.h1, globalStyles.textAlignCenter]}>
          Oops...
        </Text>
        <Text
          style={[
            globalStyles.textAlignCenter,
            globalStyles.p,
            globalStyles.font300
          ]}>
          There is a connection error. Please check your Internet and Try agian
        </Text>
      </View>
    </View>
  )
}

// NoInternet.propTypes = {
//   navigation: propTypes.any
// }

const styles = StyleSheet.create({
  Image: {
    alignSelf: 'center',
    display: 'flex',
    height: 350,
    width: 400
  },
  container: {
    alignContent: 'center',
    backgroundColor: colors.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-evenly',
    width: '100%'
  },
  textContainer: {
    alignSelf: 'center',
    width: '80%'
  }
})
