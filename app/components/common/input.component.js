import propTypes from 'prop-types'
import React from 'react'
import { Image, StyleSheet, TextInput, View } from 'react-native'

const InputBox = ({
  handleChange,
  value,
  placeholder,
  keyboardType,
  autofocus,
  blurOnSubmit,
  editable,
  multiline,
  numberOfLines,
  textAlign,
  textContentType,
  autoCapitalize,
  icon,
  maxLength,
  color
}) => {
  const styles = StyleSheet.create({
    color: {
      borderColor: color,
      color: color
    },
    icon: {
      alignItems: 'center',
      height: 36,
      left: -30,
      width: 36,
      zIndex: -1
    },
    input: {
      borderBottomWidth: 1,
      height: 40,
      width: '98%'
    },
    inputContainer: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%'
    }
  })
  console.log(color && styles.color)
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, color && styles.color]}
        onChangeText={handleChange}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoFocus={autofocus}
        blurOnSubmit={blurOnSubmit}
        editable={editable}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlign={textAlign}
        textContentType={textContentType}
        autoCapitalize={autoCapitalize}
        maxLength={maxLength ? maxLength : 40}
      />
      {icon !== undefined && (
        <Image style={[styles.icon, color && styles.color]} source={icon} />
      )}
    </View>
  )
}
InputBox.propTypes = {
  handleChange: propTypes.any.isRequired,
  value: propTypes.any.isRequired,
  placeholder: propTypes.string,
  keyboardType: propTypes.string,
  autofocus: propTypes.bool,
  blurOnSubmit: propTypes.bool,
  editable: propTypes.bool,
  multiline: propTypes.bool,
  numberOfLines: propTypes.number,
  textAlign: propTypes.string,
  textContentType: propTypes.string,
  autoCapitalize: propTypes.bool,
  icon: propTypes.any,
  maxLength: propTypes.number,
  color: propTypes.string
}

export default InputBox
