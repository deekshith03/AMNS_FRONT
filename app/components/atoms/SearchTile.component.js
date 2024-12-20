import Checkbox from 'expo-checkbox';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../variables/colors.variables';

const SearchTile = ({
  imageUrl,
  title,
  email,
  subTitle = '',
  position,
  handleClick,
  titleFontWeight = 'normal',
  selectable,
  setAddressess,
  removeAddress,
  member,
  selected,
  setSelectedStudents,
  changeSelected
}) => {
  const styles = StyleSheet.create({
    checkBoxContainer: {
      margin: 12,
      padding: 2
    },

    imageStyles: {
      borderRadius: 75,
      borderWidth: 2,
      height: 40,
      width: 40
    },
    subTitleFontStyles: {
      fontFamily: 'Roboto',
      fontSize: 15
    },
    textContainer: {
      marginLeft: 15
    },
    tileStyles: {
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: colors.backgroundInputSearch,
      borderStyle: 'solid',
      display: 'flex',
      flexDirection: 'row',
      padding: 8,
      width: '100%'
    },
    tileStylesBottom: {
      borderBottomWidth: 0
    },
    titleFontStyles: {
      fontFamily: 'Roboto',
      fontSize: 20,
      fontWeight: titleFontWeight
    }
  })

  let dynamicTitleStyles = [styles.tileStyles]

  if (position === 'bottom') {
    dynamicTitleStyles = [...dynamicTitleStyles, styles.tileStylesBottom]
  }

  const hancleCheckBox = () => {
    !selected ? setAddressess(email) : removeAddress(email)
    if (!selected) {
      setSelectedStudents && setSelectedStudents(oldValue => [...oldValue, member])
      changeSelected(email, true)
    }
    else {
      setSelectedStudents && setSelectedStudents((uls) => uls.filter((el) => el.personal_info.email !== email))
      changeSelected(email, false)
    }
  }

  if (selectable) {
    handleClick = hancleCheckBox
  }

  return (
    <TouchableOpacity style={dynamicTitleStyles} onPress={handleClick}>
      {selectable && <Checkbox value={selected} onValueChange={hancleCheckBox} style={styles.checkBoxContainer} color={colors.blue} />}
      {
        imageUrl.length > 0 && <Image
          style={styles.imageStyles}
          source={{
            uri: imageUrl
          }}
          resizeMode={'cover'}
        />
      }
      <View style={styles.textContainer}>
        <Text style={styles.titleFontStyles}>{title}</Text>
        {subTitle.length > 0 &&
          <Text style={styles.subTitleFontStyles}>{subTitle}</Text>
        }
      </View>
    </TouchableOpacity >
  )
}
SearchTile.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subTitle: PropTypes.string,
  email: PropTypes.string,
  position: PropTypes.string,
  handleClick: PropTypes.func,
  titleFontWeight: PropTypes.string,
  selectable: PropTypes.bool,
  setAddressess: PropTypes.func,
  removeAddress: PropTypes.func,
  member: PropTypes.object,
  selected: PropTypes.bool,
  setSelectedStudents: PropTypes.func,
  changeSelected: PropTypes.func
}

SearchTile.defaultProps = {
  imageUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
}


export default SearchTile
