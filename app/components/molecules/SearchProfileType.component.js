import { View, StyleSheet } from 'react-native'
import React from 'react'
import Pill from '../atoms/Pill.component'
import PropTypes from 'prop-types'
import { colors } from '../../variables/colors.variables'

const styles = StyleSheet.create({
  profileSearchTypeContainer: {
    display: 'flex',
    flexDirection: 'row'
  }
})

const SearchProfileType = ({
  studentSelected,
  userType,
  handleProfilesearchType
}) => {
  return (
    <>
      {userType !== 'student' ? (
        <View style={styles.profileSearchTypeContainer}>
          <Pill
            text={'Students'}
            value={'student'}
            alignItems={'center'}
            backgroundColor={colors.loginpink}
            fontColor={colors.black}
            fontFamily={'Roboto'}
            fontSize={12}
            paddingHorizontal={20}
            paddingVertical={6}
            borderRadius={15}
            marginBottom={6}
            closeFlag={true}
            outlined={studentSelected ? false : true}
            handleClick={() => handleProfilesearchType('student')}
          />
          <Pill
            text={'Staffs'}
            value={'staff'}
            alignItems={'center'}
            backgroundColor={colors.loginpink}
            fontColor={colors.black}
            fontFamily={'Roboto'}
            fontSize={12}
            paddingHorizontal={20}
            paddingVertical={6}
            borderRadius={15}
            marginBottom={6}
            closeFlag={true}
            outlined={studentSelected ? true : false}
            handleClick={() => handleProfilesearchType('staff')}
          />
        </View>
      ) : null}
    </>
  )
}

SearchProfileType.propTypes = {
  studentSelected: PropTypes.bool.isRequired,
  userType: PropTypes.string.isRequired,
  handleProfilesearchType: PropTypes.func.isRequired
}

export default SearchProfileType
