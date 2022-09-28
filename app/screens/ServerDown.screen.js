import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import globalStyles from '../styles/global.styles'
import { colors } from '../variables/colors.variables'
import { serverDownImage } from '../variables/paths.variables'

export const ServerDown = () => {
  return (
    <View style={styles.container}>
      <Image source={serverDownImage} style={styles.Image} />
      <View style={styles.textContainer}>
        <Text style={[globalStyles.h1, globalStyles.textAlignCenter]}>
          Server Down
        </Text>
        <Text
          style={[
            globalStyles.textAlignCenter,
            globalStyles.p,
            globalStyles.font300
          ]}>
          sorry for the inconvinence. Please try after sometime.
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
    resizeMode: 'contain',
    width: 300
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
