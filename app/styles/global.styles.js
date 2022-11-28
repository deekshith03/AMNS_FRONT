import { StyleSheet } from 'react-native'
import { colors } from '../variables/colors.variables'

const globalStyles = StyleSheet.create({
  LandingFontStyle: {
    color: colors.white,
    fontFamily: 'Roboto',
    fontSize: 18,
    textTransform: 'capitalize'
  },
  alignContentCenter: {
    alignContent: 'center',
    justifyContent: 'center'
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
    display: 'flex',
    height: '100%',
    marginTop: 40,
    width: '100%'
  },
  dflex: {
    display: 'flex'
  },
  flexColumn: {
    flexDirection: 'column'
  },
  flexRow: {
    flexDirection: 'row'
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
  h10: { height: 10 },
  inputBoxContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    paddingBottom: 20,
    paddingTop: 20
  },
  mh10: {
    marginHorizontal: 10
  },
  mv5: {
    marginVertical: 5
  },
  p: {
    fontSize: 14,
    letterSpacing: 1
  },
  screenHeader: {
    fontSize: 20,
    fontWeight: '600',
    padding: 4
  },
  text: {
    fontFamily: 'Roboto',
  },
  textAlignCenter: {
    textAlign: 'center'
  },
  w100: {
    width: '100%'
  }
})

export default globalStyles
