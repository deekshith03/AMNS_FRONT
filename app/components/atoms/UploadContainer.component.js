import { Feather } from "@expo/vector-icons"
import propTypes from "prop-types"
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import globalStyles from "../../styles/global.styles"
import { colors } from "../../variables/colors.variables"
import { PercentageCircle } from "./PercentageCircle.component"

export const UploadContainer = ({ file, percentage, deleteFile }) => {
  return <View style={[style.container]}>
    <PercentageCircle percent={percentage} radius={20} style={style.icon}><TouchableOpacity onPress={() => deleteFile(file)}><Feather name={'x'} size={24} /></TouchableOpacity></PercentageCircle>
    <Text style={style.fileName}>{file}</Text>
  </View>
}

const style = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: colors.lightGrey,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
    width: '100%'
  },
  fileName: {
    fontFamily: globalStyles.text.fontFamily,
    fontSize: 18,
    lineHeight: 40,
    width: '75%'
  },
  icon: {
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: 3,
    width: '20%'
  }
})

UploadContainer.propTypes = {
  file: propTypes.any,
  percentage: propTypes.number,
  deleteFile: propTypes.func
}