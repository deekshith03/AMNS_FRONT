import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useRef } from 'react'
import { colors } from '../../variables/colors.variables.js'
import RBSheet from 'react-native-raw-bottom-sheet'
import { useState } from 'react'
import { axiosInstance } from '../../variables/variable.js'
import { showMessage } from 'react-native-flash-message'
import { useDispatch } from 'react-redux'
import { changeState } from '../../redux/slices/loading.slice.js'
// import { setTotalExportStudentMappings } from '../../redux/slices/totalExportMappings.Slice.js'
// import { setDefaultExportStudentMappings } from '../../redux/slices/defaultExportMappings.slice.js'
import Pill from '../atoms/Pill.component.js'
import SearchTile from '../atoms/SearchTile.component.js'
import PropTypes from 'prop-types'
import * as FileSystem from 'expo-file-system'
import { StorageAccessFramework } from 'expo-file-system'

const ExportSearchData = ({
  studentSelected,
  searchPhrase,
  appliedFilters
}) => {
  const styles = StyleSheet.create({
    exportTextStyles: {
      color: colors.loginpink,
      fontFamily: 'Roboto',
      fontSize: 17,
      fontWeight: '700'
    },
    filterContainer: {
      display: 'flex',
      flexDirection: 'column'
    },

    filterHeaderContainer: {
      borderBottomWidth: 1,
      borderColor: colors.backgroundInputSearch,
      borderStyle: 'solid',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
      padding: 10
    },
    filterHeaderStyles: {
      color: colors.black,
      fontFamily: 'Roboto',
      fontSize: 20,
      textTransform: 'capitalize'
    },
    filterMarginStyle: {
      margin: 10
    },
    filterOptionStyles: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10
    },
    filterOptionStylesContainer: {
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 15,
      width: '100%'
    },
    filterTextStyles: {
      color: colors.black,
      fontFamily: 'Roboto',
      fontSize: 15,
      textTransform: 'capitalize'
    },
    pillContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 10,
      marginTop: 10
    }
  })
  const refExportRBSheet = useRef()
  const refMappingRBSheet = useRef()
  const [format, SetFormat] = useState()
  const dispatch = useDispatch()
  //   const { totalExportStudentMappings } = useSelector(
  //     (state) => state.totalExportStudentMappings
  //   )
  //   const { defaultExportStudentMappings } = useSelector(
  //     (state) => state.defaultExportStudentMappings
  //   )
  const [totalExportStudentMappings, setTotalExportStudentMappings] = useState(
    {}
  )
  const [defaultExportStudentMappings, setDefaultExportStudentMappings] =
    useState({})
  const [totalExportStaffMappings, setTotalExportStaffMappings] = useState({})
  const [defaultExportStaffMappings, setDefaultExportStaffMappings] = useState(
    {}
  )
  const [currentExportMappings, setCurrentExportMappings] = useState({})

  const handleFormatClick = async (val) => {
    if (studentSelected) {
      if (Object.keys(totalExportStudentMappings).length === 0) {
        dispatch(changeState(true))
        await axiosInstance
          .get(`/api/student/getColumns`)
          .then((res) => {
            if (res.data) {
              setTotalExportStudentMappings(res.data.columns)
              setDefaultExportStudentMappings(res.data.default_coulumns)
              setCurrentExportMappings(res.data.default_coulumns)
            }
          })
          .catch((error) => {
            const statusCode = error.response ? error.response.status : null
            if (statusCode === 500 || statusCode === 400) {
              const errMsg =
                error.response.data.errors[0].message === undefined
                  ? error.response.data.errors[0].msg
                  : error.response.data.errors[0].message

              showMessage({
                message: errMsg,
                type: 'danger',
                position: 'bottom'
              })
            } else {
              error.handleGlobally && error.handleGlobally()
            }
          })
      } else {
        setCurrentExportMappings(defaultExportStudentMappings)
      }
      dispatch(changeState(false))
    } else {
      if (Object.keys(totalExportStaffMappings).length === 0) {
        dispatch(changeState(true))
        await axiosInstance
          .get(`/api/staff/getColumns`)
          .then((res) => {
            if (res.data) {
              setTotalExportStaffMappings(res.data.columns)
              setDefaultExportStaffMappings(res.data.default_coulumns)
              setCurrentExportMappings(res.data.default_coulumns)
            }
          })
          .catch((error) => {
            const statusCode = error.response ? error.response.status : null
            if (statusCode === 500 || statusCode === 400) {
              const errMsg =
                error.response.data.errors[0].message === undefined
                  ? error.response.data.errors[0].msg
                  : error.response.data.errors[0].message

              showMessage({
                message: errMsg,
                type: 'danger',
                position: 'top'
              })
            } else {
              error.handleGlobally && error.handleGlobally()
            }
          })
      } else {
        setCurrentExportMappings(defaultExportStaffMappings)
      }
      dispatch(changeState(false))
    }
    SetFormat(val)
    refExportRBSheet.current.close()
    refMappingRBSheet.current.open()
  }

  const handlePillCancel = (key) => {
    setCurrentExportMappings((prevData) => {
      const newData = { ...prevData }
      delete newData[key]
      return newData
    })
  }

  const handleFilterSearchClick = (val) => {
    setCurrentExportMappings({
      ...currentExportMappings,
      [`${val}`]: totalExportStudentMappings[val]
    })
  }

  const handleExport = async () => {
    const data = {
      searchStr: searchPhrase,
      filter: appliedFilters,
      format: format,
      mappings: { ...currentExportMappings }
    }

    const exportURL = studentSelected ? 'student' : 'staff'
    await axiosInstance
      .post(`/api/${exportURL}/exportData`, data, { responseType: 'blob' })
      .then(async (res) => {
        const fr = new FileReader()
        fr.onload = async () => {
          const permissions =
            await StorageAccessFramework.requestDirectoryPermissionsAsync()
          if (!permissions.granted) {
            return
          }
          const fileName = `${exportURL}data_${searchPhrase}_${new Date().toLocaleString()}`
          await StorageAccessFramework.createFileAsync(
            permissions.directoryUri,
            fileName,
            `application/${format}`
          )
            .then(async (uri) => {
              await FileSystem.writeAsStringAsync(
                uri,
                fr.result.split(',')[1],
                {
                  encoding: FileSystem.EncodingType.Base64
                }
              )
              showMessage({
                message: 'file succesfully saved',
                type: 'success',
                position: 'top'
              })
            })
            .catch((e) => {
              console.log(e)
            })
        }
        fr.readAsDataURL(res.data)
      })
      .catch(async (error) => {
        const statusCode = error.response ? error.response.status : null
        if (statusCode === 500 || statusCode === 400) {
          showMessage({
            message: 'Export Falied',
            type: 'danger',
            position: 'top'
          })
        } else {
          error.handleGlobally && error.handleGlobally()
        }
      })
  }

  return (
    <>
      <View>
        <Pressable onPress={() => refExportRBSheet.current.open()}>
          <MaterialCommunityIcons
            name="export-variant"
            size={25}
            color={colors.loginpink}
          />
        </Pressable>
      </View>
      <RBSheet
        ref={refExportRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        height={220}
        dragFromTopOnly={true}
        animationType="slide"
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent'
          },
          draggableIcon: {
            backgroundColor: '#000'
          }
        }}
      >
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          style={[styles.filterContainer, styles.filterMarginStyle]}
        >
          <View style={[styles.filterHeaderContainer]}>
            <Text style={styles.filterHeaderStyles}>{'Choose format'}</Text>
          </View>
          <Pressable onPress={() => handleFormatClick('pdf')}>
            <View style={styles.filterOptionStylesContainer}>
              <View style={styles.filterOptionStyles}>
                <Text style={styles.filterTextStyles}>{'PDF'}</Text>
                <Feather
                  name="plus-circle"
                  size={20}
                  color="black"
                  style={styles.addIconStyles}
                />
              </View>
            </View>
          </Pressable>
          <Pressable onPress={() => handleFormatClick('xlsx')}>
            <View style={styles.filterOptionStylesContainer}>
              <View style={styles.filterOptionStyles}>
                <Text style={styles.filterTextStyles}>{'Excel'}</Text>
                <Feather
                  name="plus-circle"
                  size={20}
                  color="black"
                  style={styles.addIconStyles}
                />
              </View>
            </View>
          </Pressable>
        </ScrollView>
      </RBSheet>

      <RBSheet
        ref={refMappingRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        height={500}
        dragFromTopOnly={true}
        animationType="slide"
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent'
          },
          draggableIcon: {
            backgroundColor: '#000'
          }
        }}
      >
        <View
          keyboardShouldPersistTaps={'always'}
          style={[styles.filterContainer, styles.filterMarginStyle]}
        >
          <View style={[styles.filterHeaderContainer]}>
            <Text style={styles.filterHeaderStyles}>
              {'Choose Required Attributes'}
            </Text>
            <Pressable onPress={() => handleExport()}>
              <Text style={styles.exportTextStyles}>{'OK'}</Text>
            </Pressable>
          </View>
          <View style={styles.pillContainer}>
            {Object.keys(currentExportMappings).length > 0
              ? Object.keys(currentExportMappings).map((value, ind) => {
                  return (
                    <Pill
                      key={ind}
                      text={value}
                      alignItems={'center'}
                      backgroundColor={colors.loginpink}
                      fontColor={colors.black}
                      fontFamily={'Roboto'}
                      fontSize={13}
                      paddingHorizontal={5}
                      paddingVertical={6}
                      borderRadius={18}
                      marginBottom={6}
                      handleClick={() => {
                        handlePillCancel(value)
                      }}
                    />
                  )
                })
              : null}
          </View>
          <ScrollView>
            {studentSelected
              ? Object.keys(totalExportStudentMappings).length > 0 &&
                Object.keys(totalExportStudentMappings).map((val, ind) => {
                  if (ind == totalExportStudentMappings.length - 1) {
                    return (
                      <SearchTile
                        key={ind}
                        title={val}
                        position="bottom"
                        handleClick={() => {
                          handleFilterSearchClick(val)
                        }}
                      />
                    )
                  }
                  return (
                    <SearchTile
                      key={ind}
                      title={val}
                      handleClick={() => {
                        handleFilterSearchClick(val)
                      }}
                    />
                  )
                })
              : Object.keys(totalExportStaffMappings).length > 0 &&
                Object.keys(totalExportStaffMappings).map((val, ind) => {
                  if (ind == totalExportStaffMappings.length - 1) {
                    return (
                      <SearchTile
                        key={ind}
                        title={val}
                        position="bottom"
                        handleClick={() => {
                          handleFilterSearchClick(val)
                        }}
                      />
                    )
                  }
                  return (
                    <SearchTile
                      key={ind}
                      title={val}
                      handleClick={() => {
                        handleFilterSearchClick(val)
                      }}
                    />
                  )
                })}
          </ScrollView>
        </View>
      </RBSheet>
    </>
  )
}

ExportSearchData.propTypes = {
  searchPhrase: PropTypes.string.isRequired,
  studentSelected: PropTypes.bool.isRequired,
  appliedFilters: PropTypes.object.isRequired
}

export default ExportSearchData
