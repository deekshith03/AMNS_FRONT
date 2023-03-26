import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from "react-native"
import { showMessage } from 'react-native-flash-message'
import * as Yup from 'yup'
import { addStudent } from '../../apis/student.api'
import CustomButton from '../../components/atoms/CustomButton.component'
import InputBox from '../../components/atoms/input.component'
import { Title } from '../../components/atoms/Title.atom'
import { apiWrapper } from '../../utils/wrapper.api'
import { colors } from '../../variables/colors.variables'


export const AddStudent = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    roll_no: '',
    birthday: '',
    phone: '',
    location: ''
  })

  const [educationInfo, setEducationInfo] = useState({
    department_name: '',
    year: ''
  })

  const [workExp, setWorkExp] = useState({
    company_name: '',
    designation: '',
    from: '',
    work_location: ''
  })

  const [socialMedia, setSocialMedia] = useState({
    linkedin: '',
    github: '',
    twitter: ''
  })

  const [error, setError] = useState({})

  const formSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email Required'),
    name: Yup.string()
      .matches(/^[A-Za-z ]+$/, 'Enter a valid name')
      .max(40)
      .min(2)
      .required(),
    roll_no: Yup.string()
      .matches(/^\d{2}[A-Z]{3}\d{3}$/, 'enter valid roll-no'),
    phone: Yup.string()
      .matches(/^(\d{10},\s?)*\d{10}$/, 'Invalid phone numbers')
  })

  const handleChange = (func, key, value) => {
    func((data) => ({ ...data, [key]: value }))
  }

  const handleSubmit = async () => {
    const isFormValid = await formSchema.isValid(personalInfo, {
      abortEarly: false
    })

    const removeEmptyEntries = (obj) => Object
      .entries(obj)
      .reduce((acc, [key, value]) => (value !== '' ? { ...acc, [key]: value } : acc), {});

    if (isFormValid) {
      const data = [{
        personal_info: removeEmptyEntries(personalInfo),
        academics: removeEmptyEntries(educationInfo),
        work_exp: removeEmptyEntries(workExp),
        social_links: removeEmptyEntries(socialMedia)
      }]
      await apiWrapper(addStudent, { data })
    }
    else {
      formSchema.validate(personalInfo, { abortEarly: false }).catch((err) => {
        const errors = err.inner.reduce((acc, error) => {
          return {
            ...acc,
            [error.path]: error.errors[0]
          }
        }, {})

        setError(errors)

        let len = Object.entries(errors).length

        if (len > 0) {
          showMessage({
            message: Object.values(errors)[0],
            type: 'danger',
            position: 'bottom'
          })
        }
      })
    }
  }

  return <ScrollView style={styles.container}>
    <Title text="Register Student" />
    <View style={styles.inputDiv}>
      <InputBox
        value={personalInfo.name}
        handleChange={(e) => handleChange(setPersonalInfo, 'name', e)}
        placeholder={'Name'}
        type="box"
        placeholderTextColor={colors.textColor_dark}
        autoCapitalize={true}
        keyboardAppearance="dark"
        error={error.name}
        errorColor={colors.errorColor}
        autofocus={true}
      />
      <InputBox
        value={personalInfo.email}
        handleChange={(e) => handleChange(setPersonalInfo, 'email', e)}
        placeholder={'Email'}
        textContentType="email"
        type="box"
        keyboardType={'email-address'}
        placeholderTextColor={colors.textColor_dark}
        autoCapitalize={false}
        autoCompleteType="email"
        keyboardAppearance="dark"
        error={error.email}
        errorColor={colors.errorColor}
      />
      <InputBox
        value={personalInfo.roll_no}
        handleChange={(e) => handleChange(setPersonalInfo, 'roll_no', e)}
        placeholder={'Roll number'}
        type="box"
        placeholderTextColor={colors.textColor_dark}
        autoCapitalize={true}
        keyboardAppearance="dark"
        error={error.roll_no}
        errorColor={colors.errorColor}
      />
      <InputBox
        value={personalInfo.birthday}
        handleChange={(e) => handleChange(setPersonalInfo, 'birthday', e)}
        placeholder={'DOB'}
        type="box"
        placeholderTextColor={colors.textColor_dark}
        autoCapitalize={true}
        keyboardAppearance="dark"
        keyboardType={'date'}
      />
      <InputBox
        value={personalInfo.phone}
        handleChange={(e) => handleChange(setPersonalInfo, 'phone', e)}
        placeholder={'phone numbers comma separated'}
        type="box"
        placeholderTextColor={colors.textColor_dark}
        autoCapitalize={true}
        keyboardAppearance="dark"
        error={error.phone}
        errorColor={colors.errorColor}
      />
      <InputBox
        value={personalInfo.location}
        handleChange={(e) => handleChange(setPersonalInfo, 'location', e)}
        placeholder={'location'}
        type="box"
        placeholderTextColor={colors.textColor_dark}
        autoCapitalize={true}
        keyboardAppearance="dark"
        multiline={true}
      />
      <InputBox //TODO: change it to select component
        value={educationInfo.department_name}
        handleChange={(e) => handleChange(setEducationInfo, 'department_name', e)}
        placeholder={'Department name'}
        type="box"
        placeholderTextColor={colors.textColor_dark}
        autoCapitalize={true}
        keyboardAppearance="dark"
      />
      <InputBox
        value={educationInfo.year}
        handleChange={(e) => handleChange(setEducationInfo, 'year', e)}
        placeholder={'Graduate year'}
        type="box"
        placeholderTextColor={colors.textColor_dark}
        autoCapitalize={true}
        keyboardAppearance="dark"
        keyboardType={'year'}
      />
      <InputBox
        value={workExp.company_name}
        handleChange={(e) => handleChange(setWorkExp, 'company_name', e)}
        placeholder={'Company name'}
        type="box"
        placeholderTextColor={colors.textColor_dark}
        autoCapitalize={true}
        keyboardAppearance="dark"
      />
      <InputBox
        value={workExp.designation}
        handleChange={(e) => handleChange(setWorkExp, 'designation', e)}
        placeholder={'Designation'}
        type="box"
        placeholderTextColor={colors.textColor_dark}
        autoCapitalize={true}
        keyboardAppearance="dark"
      />
      <InputBox
        value={workExp.from}
        handleChange={(e) => handleChange(setWorkExp, 'from', e)}
        placeholder={'working from'}
        type="box"
        placeholderTextColor={colors.textColor_dark}
        autoCapitalize={true}
        keyboardAppearance="dark"
        keyboardType={'year'}
      />
      <InputBox
        value={workExp.work_location}
        handleChange={(e) => handleChange(setWorkExp, 'location', e)}
        placeholder={'location'}
        type="box"
        placeholderTextColor={colors.textColor_dark}
        autoCapitalize={true}
        keyboardAppearance="dark"
        multiline={true}
      />
      <InputBox
        value={socialMedia.linkedin}
        handleChange={(e) => handleChange(setSocialMedia, 'linkedin', e)}
        placeholder={'linked profile'}
        type="box"
        placeholderTextColor={colors.textColor_dark}
        autoCapitalize={true}
        keyboardAppearance="dark"
      />
      <InputBox
        value={socialMedia.twitter}
        handleChange={(e) => handleChange(setSocialMedia, 'twitter', e)}
        placeholder={'twitter profile'}
        type="box"
        placeholderTextColor={colors.textColor_dark}
        autoCapitalize={true}
        keyboardAppearance="dark"
      />
      <InputBox
        value={socialMedia.github}
        handleChange={(e) => handleChange(setSocialMedia, 'github', e)}
        placeholder={'github profile'}
        type="box"
        placeholderTextColor={colors.textColor_dark}
        autoCapitalize={true}
        keyboardAppearance="dark"
      />
      <CustomButton
        text="Add"
        handleClick={handleSubmit}
        alignItems="center"
        backgroundColor={colors.loginPink}
        fontColor={colors.white}
        fontFamily={'Roboto'}
        fontSize={18}
        paddingHorizontal={20}
        paddingVertical={10}
        bordered
        size={'large'}
      />
    </View>
  </ScrollView>
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    top: 90,
  },
  inputDiv: {
    alignContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: 1080,
    justifyContent: 'space-evenly',
    marginBottom: 110,
    marginTop: 20,
    width: '100%',
  }
})
