import React from 'react'
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { colors } from '../../variables/colors.variables'

const Loader = () => {
  const canView = useSelector((state) => state.loader.value)
  // console.log(canView)
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={canView}
      style={styles.modal}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={canView}
            size={60}
            color={colors.loadingSpinner}
          />

          {/* If you want to image set source here */}
          {/* <Image
              source={require('../assets/images/loader.gif')}
              style={{ height: 80, width: 80 }}
              resizeMode="contain"
              resizeMethod="resize"
            /> */}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  activityIndicatorWrapper: {
    alignItems: 'center',

    borderRadius: 10,
    display: 'flex',
    height: 100,
    justifyContent: 'space-around',
    width: 100
  },
  modal: {
    zIndex: 1100
  },
  modalBackground: {
    alignItems: 'center',
    backgroundColor: colors.backgroundColorDim,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    zIndex: 1000
  }
})

export default Loader
