import PropTypes from 'prop-types'
import React, { useState } from 'react'
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { colors } from '../../variables/colors.variables'

const NewChatModal = ({ setVisible }) => {
  const [roomName, setRoomName] = useState('')
  const closeModal = () => setVisible(false)
  const handleCreateRoom = () => {
    console.log({ roomName })
    closeModal()
  }
  return (
    <Modal animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.subHeading}>Enter your Room name</Text>
          <TextInput
            style={styles.modalinput}
            placeholder="Room name"
            onChangeText={(value) => setRoomName(value)}
          />
          <View style={styles.modalbuttonContainer}>
            <TouchableOpacity
              style={styles.modalbutton}
              onPress={handleCreateRoom}>
              <Text style={styles.modaltext}>CREATE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalbutton, { backgroundColor: colors.red }]}
              onPress={closeModal}>
              <Text style={styles.modaltext}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  modalView: {
    backgroundColor: colors.white,
    elevation: 10,
    height: 180,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: colors.textColor,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4
  },
  modalbutton: {
    alignItems: 'center',
    backgroundColor: colors.green,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  modalbuttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10
  },
  modalinput: {
    borderBottomWidth: 1,
    marginBottom: 5,
    paddingHorizontal: 5
  },
  modaltext: {
    color: colors.white
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  }
})

NewChatModal.propTypes = {
  setVisible: PropTypes.func
}

export default NewChatModal
