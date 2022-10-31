import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../variables/colors.variables'
import PropTypes from 'prop-types'

const SearchTile = ({
  imageUrl = '',
  title,
  subTitle = '',
  position,
  handleClick,
  titleFontWeight = 'normal'
}) => {
  const styles = StyleSheet.create({
    imageStyles: {
      borderRadius: 75,
      borderWidth: 2,
      height: 50,
      width: 50
    },

    subTitleFontStyles: {
      fontFamily: 'Roboto',
      fontSize: 15
    },
    textContainer: {
      marginLeft: 15
    },
    tileStyles: {
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

  if (position == 'bottom') {
    dynamicTitleStyles = [...dynamicTitleStyles, styles.tileStylesBottom]
  }
  return (
    <TouchableOpacity style={dynamicTitleStyles} onPress={handleClick}>
      {imageUrl.length > 0 ? (
        <Image
          style={styles.imageStyles}
          source={{
            uri: imageUrl
          }}
          resizeMode={'cover'}
        />
      ) : null}
      <View style={styles.textContainer}>
        <Text style={styles.titleFontStyles}>{title}</Text>
        {subTitle.length > 0 ? (
          <Text style={styles.subTitleFontStyles}>{subTitle}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  )
}
SearchTile.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subTitle: PropTypes.string,
  position: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  titleFontWeight: PropTypes.string
}

export default SearchTile
