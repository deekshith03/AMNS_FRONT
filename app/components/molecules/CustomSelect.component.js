import React from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import { View, StyleSheet, Text } from 'react-native'
import { colors } from '../../variables/colors.variables'
import { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import PropTypes from 'prop-types'

const CustomSelect = ({
  data,
  value,
  label,
  setSelectedValue,
  setNewHeaderMappings
}) => {
  const styles = StyleSheet.create({
    container: {
      padding: 16
    },
    dropdown: {
      borderColor: colors.lightGrey,
      borderRadius: 8,
      borderWidth: 0.5,
      height: 50,
      paddingHorizontal: 8
    },
    icon: {
      marginRight: 5
    },

    iconStyle: {
      height: 20,
      width: 20
    },

    label: {
      backgroundColor: colors.blue,
      borderRadius: 8,
      borderWidth: 0.5,
      fontSize: 14,
      left: 22,
      paddingHorizontal: 8,
      position: 'absolute',
      top: 8,
      zIndex: 999
    },
    placeholderStyle: {
      fontSize: 16
    },

    selectedTextStyle: {
      fontSize: 16
    }
  })

  const [isFocus, setIsFocus] = useState(false)

  const renderLabel = () => {
    if (label || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: colors.blue }]}>
          {label}
        </Text>
      )
    }
    return null
  }

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: colors.blue }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? value : 'select Value'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setNewHeaderMappings((prev) => ({
            ...prev,
            [label]: item.label
          }))
          setSelectedValue(item)
          setIsFocus(false)
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? 'blue' : 'black'}
            name="Safety"
            size={20}
          />
        )}
      />
    </View>
  )
}

CustomSelect.propTypes = {
  data: PropTypes.array,
  value: PropTypes.string,
  label: PropTypes.string,
  setSelectedValue: PropTypes.func,
  setNewHeaderMappings: PropTypes.func
}

export default CustomSelect
