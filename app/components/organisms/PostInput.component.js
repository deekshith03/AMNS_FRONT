import { Feather } from '@expo/vector-icons'
import * as DocumentPicker from 'expo-document-picker'
import React, { useRef, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'
import { addPost, removeFile, uploadFile } from '../../apis/post.api'
import globalStyles from '../../styles/global.styles'
import { createFormData } from '../../utils/FormData.utils'
import { apiWrapper } from '../../utils/wrapper.api'
import { colors } from '../../variables/colors.variables'
import CustomButton from '../atoms/CustomButton.component'
import { PercentageCircle } from '../atoms/PercentageCircle.component'

const PostInput = () => {
  let message = useRef()

  const [percent, setPercentage] = useState({})
  const [uploads, setUploads] = useState([])
  const [fileName, setfileNames] = useState({})
  const [captionText, setCaptionText] = useState('')

  const [tagText, setTagText] = useState('')
  const [hashtags, setHashtags] = useState([])

  const handleTextChange = (value) => {
    setTagText(value)
    const regex = /#\w+/g
    const matches = value.match(regex)
    if (matches) {
      setHashtags(matches)
    } else {
      setHashtags([])
    }
  }

  const headingOne = () => {
    return <Text style={styles.headingOne}>H1</Text>
  }
  const paperClip = () => {
    return <Feather name={'paperclip'} size={15} color={colors.lightGrey} />
  }

  const getConfig = (name) => {
    return {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent
        const percentage = Math.floor((loaded * 100) / total)
        if (percentage <= 100) {
          setPercentage({ ...percent, [`${name}`]: percentage })
        }
      }
    }
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
    await apiWrapper(removeFile, fileName[name], success_func)
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

    await apiWrapper(uploadFile, formData, getConfig(file.name), success_func)
  }

  const handlePost = async () => {
    const body = {
      caption: captionText,
      tags: hashtags,
      attachments: fileName
    }
    console.log(body)
    await apiWrapper(addPost, body)
  }
  return (
    <ScrollView style={[globalStyles.container, styles.container]}>
      <RichToolbar
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.heading1,
          actions.setStrikethrough,
          'attachments',
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.undo,
          actions.redo
        ]}
        iconSize={16}
        iconMap={{
          attachments: paperClip,
          [actions.heading1]: headingOne
        }}
        attachments={getFiles}
        editor={message}
        selectedIconTint={'#2095F2'}
        disabledIconTint={'#bfbfbf'}
        style={styles.toolBar}
      />

      <RichEditor
        placeholder={'Type your post content here...'}
        ref={message}
        initialHeight={200}
        onChange={(text) => setCaptionText(text)}
        style={styles.textEditor}
      />
      {uploads && (
        <View style={styles.uploadContainer}>
          {uploads.map((item) => (
            <View style={[globalStyles.flexRow, styles.uploadBox]} key={item}>
              <PercentageCircle percent={percent[item]} radius={12}>
                <TouchableOpacity onPress={() => deleteFile(deleteFile)}>
                  <Feather name={'x'} size={14} />
                </TouchableOpacity>
              </PercentageCircle>
              <Text style={styles.fileName}>{item}</Text>
            </View>
          ))}
        </View>
      )}

      <TextInput
        style={styles.tagInput}
        multiline
        placeholder="Enter text with hashtags..."
        value={tagText}
        onChangeText={handleTextChange}
      />
      <View style={styles.hashtagsContainer}>
        {hashtags.map((hashtag, index) => (
          <Text key={index} style={styles.hashtag}>
            {hashtag}
          </Text>
        ))}
      </View>

      <View style={styles.btn}>
        <CustomButton
          text="Post"
          handleClick={handlePost}
          alignItems="center"
          backgroundColor={colors.loginpink}
          fontColor={colors.white}
          fontFamily={'Roboto'}
          fontSize={18}
          paddingHorizontal={20}
          paddingVertical={10}
          bordered
          customWidth={100}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    marginBottom: 75,
    marginTop: 15
  },
  container: {
    paddingHorizontal: 15,
    top: 50
  },
  fileName: {
    fontFamily: globalStyles.text.fontFamily,
    fontSize: 16,
    paddingLeft: 10,
    width: '95%'
  },
  hashtag: {
    backgroundColor: colors.lightGrey,
    borderRadius: 10,
    color: colors.white,
    marginBottom: 5,
    marginRight: 5,
    padding: 5
  },
  hashtagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 20
  },
  headingOne: {
    color: colors.lightGrey,
    fontSize: 16
  },
  tagInput: {
    backgroundColor: colors.backgroundInputSearch,
    borderRadius: 5,
    margin: 10,
    padding: 10
  },
  textEditor: {
    borderRadius: 1,
    elevation: 3
  },
  toolBar: {
    backgroundColor: colors.backgroundInputSearch,
    borderRadius: 20,
    elevation: 3,
    marginBottom: 15,
    marginHorizontal: 20
  },
  uploadBox: {
    backgroundColor: colors.notificationTile,
    borderRadius: 20,
    elevation: 3,
    marginBottom: 5,
    maxWidth: '100%',
    padding: 15
  },
  uploadContainer: {
    marginHorizontal: 5,
    marginTop: 10
  }
})

export default PostInput
