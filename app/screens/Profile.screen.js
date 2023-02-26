import { Feather } from '@expo/vector-icons'
import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { ActivityDeck } from '../components/molecules/ActivityDeck'
import { ProfileSection } from '../components/molecules/ProfileSection'
import { colors } from '../variables/colors.variables'
import * as SecureStore from 'expo-secure-store'
import { useSelector } from 'react-redux'

const styles = StyleSheet.create({
  activityDeckContainer: {
    marginHorizontal: '2%',
    marginTop: '12%'
  },

  btnContainer: {
    backgroundColor: colors.white,
    borderRadius: 85,
    marginLeft: '85%',
    marginTop: '5%',
    padding: 10,
    width: 45
  },

  container: {
    width: '100%'
  },

  headerBackgroundImage: {
    backgroundSize: 'cover',
    height: 300,
    position: 'relative'
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: '45%',
    marginTop: '4%',
    textTransform: 'capitalize'
  },
  sectionContainer: {
    marginHorizontal: '2%',
    marginTop: '8%'
  },
  sectionStlyes: {
    marginBottom: '5%'
  },
  userImage: {
    borderColor: colors.white,
    borderRadius: 100,
    borderStyle: 'solid',
    borderWidth: 5,
    bottom: -100,
    height: '50%',
    left: 15,
    marginBottom: 15,
    position: 'absolute',
    width: 150
  }
})

const Profile = () => {
  const profile = useSelector((state) => state.profileSelected.value)
  const email = SecureStore.getItemAsync('email')
  let isSelfProfile = false
  if (email == profile.personal_info.email) {
    isSelfProfile = true
  }
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        style={styles.headerBackgroundImage}
        blurRadius={10}
        source={{ uri: 'https://i.imgur.com/jxyuizJ.jpeg' }}
      >
        <TouchableOpacity style={styles.btnContainer}>
          <Feather name="camera" size={24} color="black" />
        </TouchableOpacity>
        <Image
          style={styles.userImage}
          source={{
            uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          }}
        />
      </ImageBackground>
      <Text style={styles.profileName}>{profile.personal_info.name}</Text>
      <View style={styles.activityDeckContainer}>
        <ActivityDeck personal_info={profile} />
      </View>
      <View style={styles.sectionContainer}>
        {Object.keys(profile).map((val, index) => {
          return (
            <View key={index} style={styles.sectionStlyes}>
              <ProfileSection
                data={profile[val]}
                title={val}
                isSelfProfile={isSelfProfile}
              />
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}

export default Profile
