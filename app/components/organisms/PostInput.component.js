import { Feather } from '@expo/vector-icons'
import * as DocumentPicker from 'expo-document-picker'
import React, { useEffect, useRef, useState } from 'react'
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
import { addPost, getTags, removeFile, uploadFile } from '../../apis/post.api'
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
  const [fileName, setFileNames] = useState({})
  const [captionText, setCaptionText] = useState('')

  const [tagText, setTagText] = useState('')
  const [hashtags, setHashtags] = useState([])
  const [editorFocused, setEditorFocused] = useState(true)
  const [recommendedTags, setRecommendedTags] = useState([])

  function handleEditorFocus() {
    setEditorFocused(true)
  }

  function handleEditorBlur() {
    setEditorFocused(false)
  }

  const setTags = (res) => {
    setRecommendedTags(res.data || [])
  }

  useEffect(() => {
    const data = {
      content: captionText.replace(/<[^>]+>/g, '')
    }
    const image_files = Object.values(fileName).filter(fileName => /\.(jpg|jpeg|png)$/i.test(fileName))

    if (image_files.length > 0) {
      data.fileName = image_files[0]
    }

    if (!editorFocused && captionText.length > 0) {
      apiWrapper(getTags(data, setTags))
    }
  }, [editorFocused, fileName])


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
      setFileNames({ ...fileName, [`${file.name}`]: res.data.fileName })
    }

    await apiWrapper(uploadFile, formData, getConfig(file.name), success_func)
  }

  const handlePost = async () => {
    const body = {
      caption: captionText,
      tags: hashtags,
      attachments: Object.values(fileName)
    }
    await apiWrapper(addPost, body)
  }

  const removeTag = (index) => {
    setHashtags((tags) => tags.filter((item) => item !== tags[index]))
  }

  const addTag = (index) => {
    setHashtags([...hashtags, recommendedTags[index]])
    setRecommendedTags((tags) => tags.filter((item) => item !== tags[index]))
  }

  return (
    <ScrollView style={[globalStyles.container, styles.container]}>
      <RichToolbar
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.setStrikethrough,
          actions.heading1,
          'attachments',
          actions.insertLink,
          actions.insertOrderedList,
          actions.insertBulletsList
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
        initialHeight={250}
        onChange={(text) => setCaptionText(text)}
        style={styles.textEditor}
        onFocus={handleEditorFocus}
        onBlur={handleEditorBlur}
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
          <TouchableOpacity key={index} onPress={() => removeTag(index)}>
            <Text style={styles.hashtag}>
              {hashtag}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {
        recommendedTags.length > 0 && (
          <View style={[globalStyles.dflex, globalStyles.flexColumn, globalStyles.gap10]}>
            <Text style={[globalStyles.p, globalStyles.text]}>Recommended Tags:</Text>
            <View style={styles.hashtagsContainer}>
              {recommendedTags.map((hashtag, index) => (
                <TouchableOpacity key={index} onPress={() => addTag(index)}>
                  <Text style={styles.hashtag}>
                    {hashtag}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )
      }

      <View style={styles.btn}>
        <CustomButton
          text="Post"
          handleClick={handlePost}
          alignItems="center"
          backgroundColor={colors.loginPink}
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
    marginBottom: 8,
    marginRight: 8,
    padding: 5
  },
  hashtagsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
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
