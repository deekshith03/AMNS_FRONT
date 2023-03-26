import { Feather, Ionicons } from '@expo/vector-icons'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import { showMessage } from 'react-native-flash-message'
import RBSheet from 'react-native-raw-bottom-sheet'
import { useDispatch, useSelector } from 'react-redux'
import { changeState } from '../../redux/slices/loading.slice.js'
import { setTotalAdvisors } from '../../redux/slices/totalAdvisors.slice.js'
import { setTotalDepartments } from '../../redux/slices/totalDepartments.slice.js'
import { setTotalSkills } from '../../redux/slices/totalSkills.slice.js'
import { colors } from '../../variables/colors.variables.js'
import { axiosInstance, collegeStartYear } from '../../variables/variable.js'
import CustomButton from '../atoms/CustomButton.component.js'
import CustomContentLoader from '../atoms/CustomContentLoader.component.js'
import Pill from '../atoms/Pill.component.js'
import SearchTile from '../atoms/SearchTile.component.js'

const styles = StyleSheet.create({
  addIconStyles: { marginLeft: 1 },
  backIconStyles: { marginLeft: 1, marginRight: 10 },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '98%'
  },

  filterButtonStyles: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20
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
    marginBottom: 20,
    padding: 10
  },
  filterHeaderLandingSheetContainer: {
    justifyContent: 'space-between',
    margin: 15
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
  filterOptionContainer: {
    padding: 10
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
  filterSearchIconStyles: { marginLeft: 1 },
  filterTextStyles: {
    color: colors.black,
    fontFamily: 'Roboto',
    fontSize: 15,
    textTransform: 'capitalize'
  },
  input: {
    fontSize: 15,
    marginLeft: 10,
    width: '85%'
  },

  resetTextStyles: {
    color: colors.loginPink,
    fontFamily: 'Roboto'
  },

  searchBar__filter: {
    alignItems: 'center',
    borderColor: colors.backgroundInputSearch,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    flexDirection: 'row',
    padding: 5,
    width: '100%'
  },

  searchBar__unclicked: {
    alignItems: 'center',
    backgroundColor: colors.backgroundInputSearch,
    borderRadius: 15,
    flexDirection: 'row',
    padding: 10,
    width: '95%'
  },

  searchIconStyles: { marginLeft: 1 }
})

const SearchBar = ({
  userType,
  studentSelected,
  searchPhraseResults,
  handleSearchPhraseResults,
  searchPhrase,
  changeSearchPhraseText,
  handleappliedFilters
}) => {
  const refRBSheet = useRef()
  const refRBSheetDynamic = useRef()
  const adminFilterOptions = [
    'Department',
    'Company',
    'Location',
    'Graduation Year',
    'Skills',
    'Advisor'
  ]
  const studentFilterOptions = [
    'Department',
    'Company',
    'Location',
    'Graduation Year',
    'Skills'
  ]
  const staffFilterOptions = ['Department', 'Location', 'Skills']
  const [filterOptions, setFilterOptions] = useState([])
  const [currentFilter, setCurrentFilter] = useState('')
  const [currentFilterOptions, setCurrentFilterOptions] = useState([])
  const [filterSearchText, setfilterSearchText] = useState('')
  const [appliedFilters, setAppliedFilters] = useState({})
  const dispatch = useDispatch()
  const { totalDepartments } = useSelector((state) => state.totalDepartments)
  const { totalSkills } = useSelector((state) => state.totalSkills)
  const { totalAdvisors } = useSelector((state) => state.totalAdvisors)
  const searchWithFullResults = [
    'Department',
    'Graduation Year',
    'Skills',
    'Advisor'
  ]
  const searchWithInput = ['Location', 'Company']
  const filterMappingStudent = {
    Department: 'academics.department_name',
    Company: 'work_exp.company_name',
    Location: 'personal_info.location',
    'Graduation Year': 'academics.year',
    Skills: 'skills',
    Advisor: 'advisor.name'
  }
  const filterMappingStaff = {
    Department: 'work_exp.department_name',
    Location: 'personal_info.location',
    Skills: 'skills'
  }
  const [filterMappings, setFilterMappings] = useState(filterMappingStudent)
  const [Contentloader, setContentLoader] = useState(true)
  useEffect(() => {
    userType === 'admin'
      ? setFilterOptions(adminFilterOptions)
      : setFilterOptions(studentFilterOptions)
  }, [])

  useEffect(() => {
    if (!studentSelected) {
      setFilterOptions(staffFilterOptions)
      setFilterMappings(filterMappingStaff)
    } else if (studentSelected && userType === 'admin') {
      setFilterOptions(adminFilterOptions)
      setFilterMappings(filterMappingStudent)
    } else if (studentSelected) {
      setFilterOptions(studentFilterOptions)
      setFilterMappings(filterMappingStudent)
    }

    handleSearchPhraseResults([])
  }, [studentSelected])

  useEffect(() => {
    handleappliedFilters && handleappliedFilters(appliedFilters)
  }, [appliedFilters])

  const handleFilterOptions = async (currFilter) => {
    setCurrentFilter(currFilter)
    refRBSheet.current.close()
    refRBSheetDynamic.current.open()
    if (searchWithFullResults.includes(currFilter)) {
      if (currFilter === 'Department') {
        if (totalDepartments.length === 0) {
          dispatch(changeState(true))
          await axiosInstance
            .get(`/api/${currFilter.toLowerCase()}`)
            .then((res) => {
              setTotalDepartments(res.data)
              setCurrentFilterOptions(res.data)
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
          dispatch(changeState(false))
        } else {
          setCurrentFilterOptions(totalDepartments)
        }
      } else if (currFilter === 'Graduation Year') {
        let data = []
        const currYear = new Date().getFullYear()

        for (let i = collegeStartYear; i <= currYear; i++) {
          data = [...data, i]
        }
        setCurrentFilterOptions(data)
      } else if (currFilter === 'Skills') {
        if (totalSkills.length === 0) {
          dispatch(changeState(true))
          await axiosInstance
            .get(`/api/${currFilter.toLowerCase()}`)
            .then((res) => {
              setTotalSkills(res.data)
              setCurrentFilterOptions(res.data)
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
          dispatch(changeState(false))
        } else {
          setCurrentFilterOptions(totalSkills)
        }
      } else if (currFilter === 'Advisor') {
        if (totalAdvisors.length === 0) {
          dispatch(changeState(true))
          await axiosInstance
            .get(`/api/${currFilter.toLowerCase()}`)
            .then((res) => {
              setTotalAdvisors(res.data)
              setCurrentFilterOptions(res.data)
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
          dispatch(changeState(false))
        } else {
          setCurrentFilterOptions(totalAdvisors)
        }
      }
    } else {
      setCurrentFilterOptions([])
    }
  }
  const handleBackFilterSearch = () => {
    setfilterSearchText('')
    refRBSheetDynamic.current.close()
    refRBSheet.current.open()
  }

  const handleFilterSearchClick = (option) => {
    if (appliedFilters[currentFilter]) {
      if (!appliedFilters[currentFilter].includes(option))
        setAppliedFilters({
          ...appliedFilters,
          [`${currentFilter}`]: [...appliedFilters[currentFilter], option]
        })
    } else
      setAppliedFilters({ ...appliedFilters, [`${currentFilter}`]: [option] })
  }

  const handlePillCancel = (option) => {
    if (appliedFilters[currentFilter].length === 1) {
      setAppliedFilters((prevData) => {
        const newData = { ...prevData }
        delete newData[currentFilter]
        return newData
      })
    } else {
      setAppliedFilters({
        ...appliedFilters,
        [`${currentFilter}`]: appliedFilters[currentFilter].filter(
          (prevoption) => prevoption !== option
        )
      })
    }
  }

  const handleFilterSearchText = async (text) => {
    setfilterSearchText(text)

    if (text.length != 0 && searchWithInput.includes(currentFilter)) {
      axiosInstance
        .get(`/api/${currentFilter.toLowerCase()}/${text}`)
        .then((res) => {
          setCurrentFilterOptions(res.data)
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
    }
  }

  const handleSearchPhraseText = (text) => {
    changeSearchPhraseText(text)
    let filters = {}
    Object.entries(appliedFilters).forEach(([key, value]) => {
      if (value.length > 0)
        filters = { ...filters, [`${filterMappings[key]}`]: value }
    })

    const data = { searchStr: text, filter: { ...filters } }

    if (text.length > 0 || Object.entries(appliedFilters).length > 0) {
      setContentLoader(true)
      dispatch(changeState(true))
      if (studentSelected) {
        axiosInstance
          .post(`/api/student/20/1`, data)
          .then((res) => {
            handleSearchPhraseResults([...res.data])
            if (res.data > 0) setContentLoader(false)
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
        axiosInstance
          .post(`/api/staff/20/1`, data)
          .then((res) => {
            handleSearchPhraseResults([...res.data])
            if (res.data > 0) setContentLoader(false)
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
      }

      dispatch(changeState(false))
    }

    refRBSheet.current.close()
  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.searchBar__unclicked}>
          <Feather
            name="search"
            size={20}
            color="black"
            style={styles.searchIconStyles}
          />
          <TextInput
            style={styles.input}
            placeholder="Search"
            value={searchPhrase}
            onChangeText={(text) => handleSearchPhraseText(text)}
          />
          <Ionicons
            name="filter-outline"
            size={20}
            color="black"
            onPress={() => refRBSheet.current.open()}
          />
        </View>
      </View>

      {searchPhrase.length > 0 &&
        searchPhraseResults.length === 0 &&
        Contentloader ? (
        <>
          <CustomContentLoader />
          <CustomContentLoader />
        </>
      ) : null}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        height={500}
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
          style={styles.filterContainer}
        >
          <View
            style={[
              styles.filterHeaderContainer,
              styles.filterHeaderLandingSheetContainer
            ]}
          >
            <Text style={styles.filterHeaderStyles}>{'Filter people by'}</Text>
            <Pressable onPress={() => setAppliedFilters({})}>
              <Text style={styles.resetTextStyles}>{'Reset'}</Text>
            </Pressable>
          </View>
          <View style={styles.filterOptionContainer}>
            {filterOptions.map((option, ind) => {
              return (
                <Pressable
                  key={ind}
                  onPress={() => handleFilterOptions(option)}
                >
                  <View style={styles.filterOptionStylesContainer}>
                    <View style={styles.filterOptionStyles}>
                      <Text style={styles.filterTextStyles}>{option}</Text>
                      <Feather
                        name="plus-circle"
                        size={20}
                        color="black"
                        style={styles.addIconStyles}
                      />
                    </View>
                    {appliedFilters[option] &&
                      appliedFilters[option].length > 0 ? (
                      <Pill
                        key={ind}
                        text={
                          appliedFilters[option].length > 1
                            ? `${appliedFilters[option][0]} + ${appliedFilters[option].length - 1
                            }`
                            : `${appliedFilters[option][0]}`
                        }
                        alignItems={'center'}
                        backgroundColor={colors.loginPink}
                        fontColor={colors.black}
                        fontFamily={'Roboto'}
                        fontSize={12}
                        paddingHorizontal={5}
                        paddingVertical={6}
                        borderRadius={15}
                        marginBottom={6}
                        closeFlag={true}
                      />
                    ) : null}
                  </View>
                </Pressable>
              )
            })}
          </View>
          <View style={styles.filterButtonStyles}>
            <CustomButton
              text="Show Results"
              alignItems={'center'}
              backgroundColor={colors.loginPink}
              fontColor={colors.white}
              fontFamily={'Roboto'}
              fontSize={15}
              paddingHorizontal={5}
              paddingVertical={10}
              size={'large'}
              handleClick={() => {
                handleSearchPhraseText(searchPhrase)
              }}
              bordered={true}
            />
          </View>
        </ScrollView>
      </RBSheet>
      <RBSheet
        ref={refRBSheetDynamic}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        height={600}
        dragFromTopOnly={true}
        animationType="slide"
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent'
          },
          draggableIcon: {
            backgroundColor: '#000'
          },
          container: {
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15
          }
        }}
      >
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          style={[styles.filterContainer, styles.filterMarginStyle]}
        >
          <View style={styles.filterHeaderContainer}>
            <Pressable onPress={() => handleBackFilterSearch()}>
              <Feather
                name="arrow-left"
                size={25}
                color="black"
                style={styles.backIconStyles}
              />
            </Pressable>
            <Text style={styles.filterHeaderStyles}>
              {'Filter people by ' + currentFilter}
            </Text>
          </View>
          <View style={styles.searchBar__filter}>
            <Feather
              name="search"
              size={20}
              color="black"
              style={styles.filterSearchIconStyles}
            />
            <TextInput
              style={styles.input}
              placeholder={'Search ' + currentFilter}
              value={filterSearchText}
              onChangeText={(text) => handleFilterSearchText(text)}
              PIll
            />
          </View>
          <View style={styles.pillContainer}>
            {appliedFilters[currentFilter]
              ? appliedFilters[currentFilter].map((value, ind) => {
                return (
                  <Pill
                    key={ind}
                    text={value}
                    alignItems={'center'}
                    backgroundColor={colors.loginPink}
                    fontColor={colors.black}
                    fontFamily={'Roboto'}
                    fontSize={12}
                    paddingHorizontal={5}
                    paddingVertical={6}
                    borderRadius={15}
                    marginBottom={6}
                    handleClick={() => {
                      handlePillCancel(value)
                    }}
                  />
                )
              })
              : null}
          </View>
          {currentFilterOptions &&
            currentFilterOptions.map((option, ind) => {
              const regex = new RegExp(filterSearchText, 'gi')
              if (
                option.isInteger
                  ? option.match(regex)
                  : option.toString().match(regex) &&
                  searchWithFullResults.includes(currentFilter)
              ) {
                if (ind == currentFilterOptions.length - 1) {
                  return (
                    <SearchTile
                      key={ind}
                      title={option}
                      position="bottom"
                      handleClick={() => {
                        handleFilterSearchClick(option)
                      }}
                    />
                  )
                }
                return (
                  <SearchTile
                    key={ind}
                    title={option}
                    handleClick={() => {
                      handleFilterSearchClick(option)
                    }}
                  />
                )
              } else if (searchWithInput.includes(currentFilter)) {
                if (ind == currentFilterOptions.length - 1) {
                  return (
                    <SearchTile
                      key={ind}
                      title={option}
                      position="bottom"
                      handleClick={() => {
                        handleFilterSearchClick(option)
                      }}
                    />
                  )
                }
                return (
                  <SearchTile
                    key={ind}
                    title={option}
                    handleClick={() => {
                      handleFilterSearchClick(option)
                    }}
                  />
                )
              }
            })}
        </ScrollView>
      </RBSheet>
    </>
  )
}
SearchBar.propTypes = {
  userType: PropTypes.string.isRequired,
  studentSelected: PropTypes.bool.isRequired,
  searchPhraseResults: PropTypes.array.isRequired,
  handleSearchPhraseResults: PropTypes.func.isRequired,
  searchPhrase: PropTypes.string.isRequired,
  changeSearchPhraseText: PropTypes.func.isRequired,
  handleappliedFilters: PropTypes.func
}

export default SearchBar
