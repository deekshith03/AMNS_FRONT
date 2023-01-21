import { Feather } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import React, { useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { showMessage } from 'react-native-flash-message';
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import RBSheet from 'react-native-raw-bottom-sheet';
import { addAttachment, deleteAttachment, sendMail } from '../apis/mail.api.js';
import CustomButton from '../components/atoms/CustomButton.component.js';
import InputBox from "../components/atoms/input.component";
import { UploadContainer } from '../components/atoms/UploadContainer.component.js';
import SearchProfileType from '../components/molecules/SearchProfileType.component.js';
import SearchBar from '../components/organisms/SearchBar.component.js';
import SearchPageResults from '../components/organisms/SearchPageResults.component.js';
import globalStyles from "../styles/global.styles";
import { createFormData } from '../utils/FormData.utils.js';
import { apiWrapper } from '../utils/wrapper.api.js';
import { colors } from '../variables/colors.variables';

export const Mailer = () => {
  const refRBSheet = useRef()

  const [subject, setSubject] = useState('')
  const [studentSelected, setStudentSelected] = useState(true)
  const [searchPhraseResults, setSearchPhraseResults] = useState([])
  const [searchPhrase, setSearchPhrase] = useState('')

  const [percent, setPercentage] = useState({})
  const [uploads, setUploads] = useState([])
  const [fileName, setfileNames] = useState({})

  const [addresses, setAddressess] = useState([])
  const [selectedStudents, setSelectedStudents] = useState([])

  const [Html, setHtml] = useState("")

  const handleAddAddress = (address) => {
    setAddressess([...addresses, address])
  }
  const handleRemoveAddress = (address) => {
    setAddressess((uls) => uls.filter((el) => el !== address))
  }

  const handleProfilesearchType = (value) => {
    if (
      (value != 'student' && studentSelected) ||
      (value != 'staff' && !studentSelected)
    )
      setStudentSelected((prevData) => !prevData)
  }

  const getConfig = (name) => {
    return {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percentage = Math.floor((loaded * 100) / total)
        if (percentage <= 100) {
          setPercentage({ ...percent, [`${name}`]: percentage }) // hook to set the value of current level that needs to be passed to the progressbar
        }
      }
    }
  }

  let message = useRef();

  const handleSend = async () => {
    const body = {
      to: addresses,
      subject,
      html: Html,
      files: fileName
    }
    await apiWrapper(sendMail, body)
  }

  const deleteFile = async (name) => {
    const success_func = () => {
      setUploads((uls) => uls.filter((el) => el !== name))
      setPercentage((cur) => {
        const copy = { ...cur }
        delete copy[`${name}`]
        return { ...copy }
      })
    }
    await apiWrapper(deleteAttachment, fileName[name], success_func)
  }

  const paperClip = () => {
    return <Feather
      name={"paperclip"}
      size={18}
      color={"#2095F2"} />
  }

  const getFiles = async () => {
    const file = await DocumentPicker.getDocumentAsync({})

    if (percent[file.name]) {
      showMessage({
        message: 'file Already persent',
        type: 'alert',
        position: 'bottom'
      })
      return
    }
    setUploads([...uploads, file.name])

    const formData = createFormData(file, {})

    const success_func = (res) => {
      setfileNames({ ...fileName, [`${file.name}`]: res.data.fileName })
    }

    await apiWrapper(addAttachment, formData, getConfig(file.name), success_func)
  }

  return <ScrollView style={[globalStyles.container, style.container]}>
    <View style={[globalStyles.dflex, globalStyles.flexColumn, globalStyles.alignContentCenter]}>
      <View style={[style.sendBtn]}>
        <CustomButton
          text={"send"}
          handleClick={handleSend}
          alignItems={'center'}
          backgroundColor={colors.loginpink}
          fontColor={colors.white}
          fontFamily={'Roboto'}
          fontSize={18}
          paddingHorizontal={20}
          paddingVertical={10}
          bordered={false}
          size={'small'}
          customWidth={140}
          icon={'arrow-right'}
        />
      </View>
      <View style={[style.inputContainer]}>
        <Text style={[style.label, globalStyles.text]}>To:</Text>
        <CustomButton text='Select' backgroundColor={colors.white} width={500} handleClick={() => refRBSheet.current.open()} />

      </View>
      <View style={[style.inputContainer]}>
        <Text style={[style.label, globalStyles.text]}>Subject:</Text>
        <InputBox value={subject} handleChange={setSubject} width={"82%"} placeholder={"Enter your subject here"} />
      </View>
      <RichToolbar
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.undo,
          actions.redo,
          'attachments'
        ]}
        iconMap={{ attachments: paperClip }}
        attachments={getFiles}
        editor={message}
        selectedIconTint={'#2095F2'}
        disabledIconTint={'#bfbfbf'}
      />
      <RichEditor placeholder={"Enter your message"} ref={message} initialHeight={300} onChange={setHtml} />
    </View>
    {uploads && <View style={style.uploadContainer}>{uploads.map((item) => <UploadContainer file={item} percentage={percent[item]} key={item} deleteFile={deleteFile} />)}</View>}

    <RBSheet ref={refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={true}
      closeOnPressBack={true}
      height={710}
      customStyles={{
        wrapper: {
          backgroundColor: 'transparent'
        },
        draggableIcon: {
          backgroundColor: '#000'
        }
      }}>
      <SearchProfileType
        userType={"admin"}
        studentSelected={studentSelected}
        handleProfilesearchType={handleProfilesearchType}
      />
      <SearchBar userType='admin'
        studentSelected={studentSelected}
        searchPhraseResults={searchPhraseResults}
        handleSearchPhraseResults={setSearchPhraseResults}
        searchPhrase={searchPhrase}
        changeSearchPhraseText={setSearchPhrase}
      />
      <SearchPageResults results={searchPhraseResults} selectable={true} setAddressess={handleAddAddress} removeAddress={handleRemoveAddress} selectedStudents={selectedStudents} setSelectedStudents={setSelectedStudents} />
    </RBSheet>
  </ScrollView>
}

const style = StyleSheet.create({
  container: {
    top: 90,
    width: '100%'
  },
  inputContainer: {
    alignContent: 'center',
    display: "flex",
    flexDirection: "row",
    marginBottom: 12,
    width: '97%'
  },
  label: {
    fontSize: 14,
    marginHorizontal: 10,
    marginTop: 12
  },
  sendBtn: {
    alignItems: 'flex-end',
    display: 'flex',
    width: '97%'
  },
  uploadContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: 10,
    paddingBottom: 100,
    width: '100 %'
  }
})
