import { Feather } from '@expo/vector-icons'
import propTypes from 'prop-types'
import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

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
  color,
  secureTextEntry,
  placeholderTextColor,
  autoCompleteType,
  keyboardAppearance,
  error,
  errorColor,
  type,
  width
}) => {
  const validationColor = error ? errorColor : placeholderTextColor

  const styles = StyleSheet.create({
    border1: {
      borderColor: placeholderTextColor != undefined ? validationColor : color,
      borderRadius: 7,
      borderWidth: 1
    },
    color: {
      borderColor: placeholderTextColor != undefined ? validationColor : color,
      color: color,
      placeholderTextColor: validationColor
    },
    icon: {
      alignSelf: 'center',
      height: 24,
      left: -30,
      width: 24,
      zIndex: -1
    },
    input: {
      borderBottomWidth: 1,
      height: 40,
      paddingHorizontal: 10,
      width: '98%'
    },
    inputContainer: {
      display: 'flex',
      flexDirection: 'row',
      width: width ? width : '100%'
    }
  })

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, color && styles.color, type && styles.border1]}
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
        secureTextEntry={secureTextEntry}
        placeholderTextColor={placeholderTextColor}
        autoCompleteType={autoCompleteType}
        keyboardAppearance={keyboardAppearance}
      />
      {icon !== undefined && (
        <Feather
          name={icon}
          size={24}
          color={placeholderTextColor}
          style={styles.icon}
        />
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
  color: propTypes.string,
  secureTextEntry: propTypes.bool,
  placeholderTextColor: propTypes.string,
  autoCompleteType: propTypes.string,
  keyboardAppearance: propTypes.string,
  error: propTypes.string,
  errorColor: propTypes.string,
  type: propTypes.string,
  width: propTypes.string
}

export default InputBox
