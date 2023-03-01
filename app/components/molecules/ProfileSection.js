import { AntDesign, Feather } from '@expo/vector-icons'
import React from 'react'
import { View, StyleSheet, Text, Linking, TouchableOpacity } from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import globalStyles from '../../styles/global.styles'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  headingStyles: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: '4%',
    textAlign: 'center',
    textTransform: 'capitalize'
  },
  sectionBody: {
    marginTop: '4%'
  },

  sectionContainer: {
    padding: 10,
    width: '100%'
  },
  sectionEntry: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '5%',
    textTransform: 'capitalize'
  },
  sectionHeading: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sectionKey: {
    textTransform: 'capitalize'
  },
  socialMediaContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '5%'
  }
})

const titleMappings = {
  personal_info: 'Personal Info',
  skills: 'skills',
  work_exp: 'Work Experience',
  advisor: 'Advisor',
  academics: 'Academics',
  social_links: 'Social Links'
}

const socialMediaMappings = {
  linked_in: { val: 'linkedin-square', color: '#0A66C2' },
  twitter: { val: 'twitter', color: '#00acee' },
  github: { val: 'github', color: '#171515' }
}
export const ProfileSection = ({ data, title, isSelfProfile }) => {
  return (
    <View style={styles.sectionContainer}>
      <Shadow style={styles.sectionContainer}>
        <View>
          <View style={styles.sectionHeading}>
            <Text style={styles.headingStyles}>{titleMappings[title]}</Text>
            {isSelfProfile && (
              <TouchableOpacity>
                <Feather name="edit" size={20} color="black" />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.sectionBody}>
            {title === 'social_links' ? (
              <View style={styles.socialMediaContainer}>
                {Object.entries(data).map(([key, val], index) => {
                  return (
                    <AntDesign
                      key={index}
                      name={socialMediaMappings[key].val}
                      size={24}
                      color={socialMediaMappings[key].color}
                      onPress={() => Linking.openURL(val)}
                    />
                  )
                })}
              </View>
            ) : (
              <>
                {Array.isArray(data) ? (
                  <View style={styles.sectionEntry}>
                    <Text style={[globalStyles.font300, styles.sectionValue]}>
                      {data.join()}
                    </Text>
                  </View>
                ) : (
                  Object.entries(data).map(([key, val], index) => {
                    return (
                      <View key={index} style={styles.sectionEntry}>
                        <Text style={[globalStyles.font500, styles.sectionKey]}>
                          {key}
                        </Text>
                        <Text
                          style={[globalStyles.font300, styles.sectionValue]}
                        >
                          {val}
                        </Text>
                      </View>
                    )
                  })
                )}
              </>
            )}
          </View>
        </View>
      </Shadow>
    </View>
  )
}

ProfileSection.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  title: PropTypes.string.isRequired,
  isSelfProfile: PropTypes.bool.isRequired
}
