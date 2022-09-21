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
  placeholderTextColor
}) => {
  const styles = StyleSheet.create({
    color: {
      borderColor:
        placeholderTextColor != undefined ? placeholderTextColor : color,
      color: color
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
      width: '98%'
    },
    inputContainer: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%'
    }
  })
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
        secureTextEntry={secureTextEntry}
        placeholderTextColor={placeholderTextColor}
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
  placeholderTextColor: propTypes.string
}

export default InputBox
