import { ImageBackground, View, Text } from 'react-native'
import React from 'react'

const image = { uri: '../assets' }

const AuthScreen = () => {
  return (
    <View>
      <ImageBackground source={image} resizeMode="cover">
        <Text>Inside</Text>
      </ImageBackground>
    </View>
  )
}

export default AuthScreen
