import { FontAwesome, Ionicons } from '@expo/vector-icons'
import * as DocumentPicker from 'expo-document-picker'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { hideMessage, showMessage } from 'react-native-flash-message'
import { useDispatch } from 'react-redux'
import { generateJSON, saveExcelData } from '../apis/import.api'
import CustomButton from '../components/atoms/CustomButton.component'
import InputBox from '../components/atoms/input.component'
import CustomSelect from '../components/molecules/CustomSelect.component'
import { changeState } from '../redux/slices/loading.slice'
import { createFormData } from '../utils/FormData.utils'
import { apiWrapper } from '../utils/wrapper.api'
import { colors } from '../variables/colors.variables'

export const ImportScreen = () => {
  const styles = StyleSheet.create({
    btnContainer: {
      display: 'flex',
      gap: '2%'
    },

    btnSize: {
      paddingBottom: 5
    },
    btnStyles: {
      marginTop: 10
    },
    customDialogContainer: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },

    dropDownContainer: { flex: 1, marginBottom: 100 },

    fileStyles: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },

    headerContainer: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      marginTop: 50
    },
    resultMsg: { marginBottom: '5%' },

    screenStyles: {
      height: '100%',
      marginTop: 120,
      padding: 20,
      width: '100%'
    },
    uploadContainer: {
      // backgroundColor: colors.lightGrey,
      alignItems: 'center',
      borderColor: colors.lightGrey,
      borderStyle: 'dotted',
      borderWidth: 3,
      display: 'flex',
      height: '30%',
      justifyContent: 'center',
      width: '100%'
    }
  })

  const [fileName, setFileName] = useState(null)
  const [headerMappings, setHeaderMappings] = useState()
  const [totalHeaders, setTotalHeaders] = useState()
  // eslint-disable-next-line no-unused-vars
  const [selectedHeader, setSelectedHeader] = useState()
  const [newHeaderMappings, setNewHeaderMappings] = useState()
  const [excelData, setExcelData] = useState()
  const [headerNumber, setHeaderNumber] = useState(1)
  const [file, setFile] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    if (headerMappings && headerMappings.length > 0)
      setSelectedHeader(headerMappings[0])
  }, [headerMappings])

  const generateHeaderMappings = async () => {
    const formData = createFormData(file, {})
    const success_func = (res) => {
      const transformedData = []
      for (const [key, value] of Object.entries(res.data.message.mappings)) {
        transformedData.push({ label: key, value: value })
      }
      setHeaderMappings(transformedData)
      setTotalHeaders(res.data.message.data.headers)
      setExcelData(res.data.message.data.excelData)
    }
    await apiWrapper(generateJSON, formData, headerNumber, success_func)
  }
  const getFiles = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({})
      if (file.name) {
        setFileName(file.name)
        setFile(file)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const submitHandler = async () => {
    let val = {}

    headerMappings.map((element) => {
      const label = element.label
      const value = element.value
      if (newHeaderMappings && newHeaderMappings[label]) {
        if (newHeaderMappings[label] !== 'not applicable') {
          val = { ...val, ...{ [newHeaderMappings[label]]: label } }
        }
      } else {
        val = { ...val, ...{ [value]: label } }
      }
    })

    const success_func = (success, savedDocs, errorDocs) => {
      dispatch(changeState(false))

      showMessage({
        message: '',
        type: success ? 'success' : 'danger',
        position: 'center',
        backgroundColor: colors.white,
        statusBarHeight: '20%',
        autoHide: false,
        style: {
          width: '80%'
        },
        renderCustomContent: () => {
          return (
            <View style={styles.customDialogContainer}>
              <Text style={styles.resultMsg}>
                Total documents saved {savedDocs}
              </Text>
              <Text style={styles.resultMsg}>
                Error documents {errorDocs.length}
              </Text>
              <CustomButton
                backgroundColor={colors.loginPink}
                fontSize={10}
                paddingVertical={8}
                fontColor={colors.white}
                text="OK"
                handleClick={() => {
                  hideMessage()
                }}
              />
            </View>
          )
        }
      })
    }
    dispatch(changeState(true))
    await apiWrapper(
      saveExcelData,
      { headerMappings: val, excelData },
      success_func
    )
  }

  const cancelHandler = () => {
    setFileName(null)
    setFile()
    setHeaderMappings()
    setSelectedHeader()
    setTotalHeaders()
    setExcelData()
    setNewHeaderMappings()
  }

  return (
    <>
      <View style={styles.screenStyles}>
        <View style={styles.uploadContainer}>
          {fileName === null ? (
            <Ionicons
              name="md-add-circle-outline"
              size={50}
              color="black"
              onPress={getFiles}
            />
          ) : (
            <View style={styles.fileStyles}>
              <FontAwesome
                name="file-excel-o"
                size={100}
                color={colors.lightGrey}
              />
              <Text>{fileName}</Text>
              <View style={styles.btnContainer}>
                <View style={styles.btnSize}>
                  <CustomButton
                    text="cancel"
                    backgroundColor={colors.loginPink}
                    fontSize={10}
                    fontColor={colors.white}
                    paddingVertical={8}
                    handleClick={() => cancelHandler()}
                  />
                </View>
                {headerMappings !== undefined && (
                  <View>
                    <CustomButton
                      text="Import"
                      backgroundColor={colors.loginPink}
                      fontSize={10}
                      fontColor={colors.white}
                      paddingVertical={8}
                      handleClick={() => submitHandler()}
                    />
                  </View>
                )}
              </View>
            </View>
          )}
        </View>

        {headerMappings !== undefined ? (
          <ScrollView style={styles.dropDownContainer} scrollEnabled={true}>
            {headerMappings.map((element, index) => {
              return (
                <CustomSelect
                  key={index}
                  data={totalHeaders}
                  value={element.value}
                  label={element.label}
                  setSelectedValue={setSelectedHeader}
                  setNewHeaderMappings={setNewHeaderMappings}
                />
              )
            })}
          </ScrollView>
        ) : (
          <View style={styles.headerContainer}>
            <View>
              <InputBox
                handleChange={setHeaderNumber}
                value={headerNumber}
                placeholder={'Enter Header Number'}
                keyboardType={'number-pad'}
              />
            </View>
            <View style={styles.btnStyles}>
              <CustomButton
                text="Proceed"
                backgroundColor={colors.loginPink}
                fontSize={10}
                fontColor={colors.white}
                paddingVertical={8}
                handleClick={() => generateHeaderMappings()}
              />
            </View>
          </View>
        )}
      </View>
    </>
  )
}
