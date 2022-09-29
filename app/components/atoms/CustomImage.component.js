import React from 'react'
import { Image, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const CustomImage = ({
  source,
  width,
  height,
  shape,
  resizeMode,
  resizeMethod,
  borderRadius
}) => {
  const styles = StyleSheet.create({
    circle: {
      border: '2px solid #ddd',
      borderRadius: borderRadius,
      height: height,
      padding: 5,
      width: width
    },
    curvedSquare: {
      border: '2px solid #ddd',
      borderRadius: 30,
      height: height,
      padding: 5,
      width: width
    },
    square: {
      border: '2px solid #ddd',
      height: height,
      padding: 5,
      width: width
    }
  })

  let customStyle
  if (shape === 'square') customStyle = styles.square
  else if (shape === 'circle') customStyle = styles.circle
  else if (shape === 'curvedSquare') customStyle = styles.curvedSquare

  return (
    <Image
      style={customStyle}
      source={source}
      resizeMode={resizeMode}
      resizeMethod={resizeMethod}
    />
  )
}

CustomImage.defaultProps = {
  width: 50,
  height: 50,
  shape: 'circle',
  resizeMode: 'cover',
  resizeMethod: 'auto',
  borderRadius: 50
}

CustomImage.propTypes = {
  source: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  shape: PropTypes.string,
  resizeMode: PropTypes.string,
  resizeMethod: PropTypes.string,
  borderRadius: PropTypes.number
}

export default CustomImage
