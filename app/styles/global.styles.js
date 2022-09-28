import { StyleSheet } from 'react-native'
import { colors } from '../variables/colors.variables'

const globalStyles = StyleSheet.create({
  LandingFontStyle: {
    color: colors.white,
    fontFamily: 'Roboto',
    fontSize: 18,
    textTransform: 'capitalize'
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: colors.loginpink,
    borderRadius: 30,
    elevation: 8,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  container: {
    flex: 1,
    height: '100%',
    marginTop: 40,
    width: '100%'
  },
  font100: {
    fontWeight: '100'
  },
  font200: {
    fontWeight: '200'
  },
  font300: {
    fontWeight: '300'
  },
  h1: {
    fontSize: 24,
    fontWeight: '700'
  },
  inputBoxContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    paddingBottom: 20,
    paddingTop: 20
  },
  p: {
    fontSize: 14,
    letterSpacing: 1
  },
  textAlignCenter: {
    textAlign: 'center'
  }
})

export default globalStyles
