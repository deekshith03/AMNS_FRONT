import { View, StyleSheet } from 'react-native'
import React from 'react'
import SearchProfileType from '../components/molecules/SearchProfileType.component'
import PropTypes from 'prop-types'
import { useState } from 'react'
import SearchBar from '../components/organisms/SearchBar.component'
import SearchPageResults from '../components/organisms/SearchPageResults.component'
import ExportSearchData from '../components/molecules/ExportSearchData.component'
import DismissKeyBoard from '../components/atoms/DismissKeyBoard.component'

const SearchScreen = ({ userType }) => {
  const styles = StyleSheet.create({
    menuContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      width: '95%'
    },
    screenStyles: {
      marginTop: 50
    }
  })
  const [studentSelected, setStudentSelected] = useState(true)
  const [searchPhraseResults, setSearchPhraseResults] = useState([])
  const [searchPhrase, setSearchPhrase] = useState('')
  const [appliedFilters, setAppliedFilters] = useState({})

  const handleProfilesearchType = (value) => {
    if (
      (value != 'student' && studentSelected) ||
      (value != 'staff' && !studentSelected)
    )
      setStudentSelected((prevData) => !prevData)
  }

  const handleSearchPhraseResults = (data) => {
    setSearchPhraseResults(data)
  }

  const handleappliedFilters = (data) => {
    setAppliedFilters({ ...data })
  }

  const changeSearchPhraseText = (text) => {
    setSearchPhrase(text)
  }
  return (
    <DismissKeyBoard>
      <View style={styles.screenStyles}>
        {userType !== 'student' ? (
          <View style={styles.menuContainer}>
            <SearchProfileType
              userType={userType}
              studentSelected={studentSelected}
              handleProfilesearchType={handleProfilesearchType}
            />
            {searchPhraseResults.length > 0 && searchPhrase.length > 0 ? (
              <ExportSearchData
                studentSelected={studentSelected}
                searchPhrase={searchPhrase}
                appliedFilters={appliedFilters}
              />
            ) : null}
          </View>
        ) : null}
        <SearchBar
          userType={userType}
          studentSelected={studentSelected}
          searchPhraseResults={searchPhraseResults}
          handleSearchPhraseResults={handleSearchPhraseResults}
          searchPhrase={searchPhrase}
          changeSearchPhraseText={changeSearchPhraseText}
          handleappliedFilters={handleappliedFilters}
        />
        <SearchPageResults
          searchPhraseResults={searchPhraseResults}
          studentSelected={studentSelected}
          handleSearchPhraseResults={handleSearchPhraseResults}
        />
      </View>
    </DismissKeyBoard>
  )
}
SearchScreen.propTypes = {
  userType: PropTypes.string.isRequired
}

export default SearchScreen
