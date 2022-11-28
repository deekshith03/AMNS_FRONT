import ContentLoader, { Rect, Circle } from 'react-content-loader/native'
import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  contentLoaderContainer: {
    display: 'flex',
    margin: 7
  }
})
const width = Dimensions.get('window').width

const CustomContentLoader = () => {
  return (
    <ContentLoader
      style={styles.contentLoaderContainer}
      width={width - 10}
      height={80}
      speed={1}
      backgroundColor={'#d9d9d9'}
      foregroundColor={'#ededed'}
      viewBox="0 0 380 70"
    >
      <Circle cx="30" cy="30" r="30" />
      <Rect x="70" y="17" rx="4" ry="4" width={width - 100} height="13" />
      <Rect x="70" y="40" rx="3" ry="3" width={width - 200} height="10" />
    </ContentLoader>
  )
}

export default CustomContentLoader
