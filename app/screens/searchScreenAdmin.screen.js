import React from 'react'
import { StyleSheet } from 'react-native'
import { SearchScreen } from './SearchScreen.screen'

export const SearchScreenAdmin = () => {
  return <SearchScreen userType="admin" style={styles.header} />
}

const styles = StyleSheet.create({
  header: {
    marginTop: 30
  }
})
