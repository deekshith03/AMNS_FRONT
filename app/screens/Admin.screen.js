import { Feather } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import globalStyles from '../styles/global.styles'
import { colors } from '../variables/colors.variables'

export const AdminDashboard = () => {
  return (
    <View style={[globalStyles.container, globalStyles.flexRow]}>
      <View
        style={[
          styles.header,
          globalStyles.dflex,
          globalStyles.flexRow,
          globalStyles.w100
        ]}>
        <TouchableOpacity>
          <Feather
            name="menu"
            size={26}
            color={colors.black}
            style={[globalStyles.mh10, globalStyles.mv5]}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather
            name="bell"
            size={26}
            color={colors.black}
            style={[globalStyles.mh10, globalStyles.mv5]}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

// NoInternet.propTypes = {
//   navigation: propTypes.any
// }

const styles = StyleSheet.create({
  header: {
    alignContent: 'center',
    justifyContent: 'space-between'
  }
})
