import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList
} from '@react-navigation/drawer'
import PropTypes from 'prop-types'
import React from 'react'

export const AdminDrawer = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props}>
        <DrawerItem
          label="Add Staff"
          onPress={() => props.navigation.toggleDrawer()}
        />
      </DrawerItemList>
    </DrawerContentScrollView>
  )
}

AdminDrawer.propTypes = {
  navigation: PropTypes.any
}
