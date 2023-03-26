import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { ScrollView, Text } from 'react-native'
import { useDispatch } from 'react-redux'
import { getProfile } from '../../apis/profile.api'
import { navigateTo } from '../../helpers/navigation.helper'
import { setProfileSelected } from '../../redux/slices/profileSelected.slice'
import { apiWrapper } from '../../utils/wrapper.api'
import { Base_uri } from '../../variables/variable'
import SearchTile from '../atoms/SearchTile.component'

const SearchPageResults = ({
  results,
  selectable,
  setAddressess,
  removeAddress,
  selectedStudents,
  setSelectedStudents,
  studentSelected
}) => {
  const changeSelected = (email, val) => {
    setSelected({ ...selected, [`${email}`]: val })
  }
  const sel = {}
  results &&
    results.map((obj) => {
      sel[`${obj.personal_info.email}`] = false
    })

  const [selected, setSelected] = useState(sel)

  const dispatch = useDispatch()

  const handleSelectedProfile = (obj) => {
    const success_fun = (data) => {
      dispatch(setProfileSelected(data))
      navigateTo('ProfileScreen')
    }

    apiWrapper(
      getProfile,
      {
        id: obj._id,
        type: studentSelected ? 'student' : 'staff'
      },
      success_fun
    )
  }

  return (
    <ScrollView>
      {results &&
        results.map((obj, ind) => {
          const department_name =
            obj.academics?.department_name || obj.work_exp?.department_name
          const company_name =
            obj.work_exp?.company_name || obj.work_exp?.designation
          const subTitle =
            department_name &&
            department_name + '⬩' + company_name &&
            company_name

          return (
            <SearchTile
              key={ind}
              email={obj.personal_info.email}
              title={obj.personal_info.name}
              subTitle={subTitle}
              imageUrl={
                obj.user_id?.profilePic && `${Base_uri}${obj.user_id?.profilePic}`
              }
              handleClick={() => handleSelectedProfile(obj)}
              setAddressess={setAddressess}
              removeAddress={removeAddress}
              position={ind == results.length - 1 ? 'bottom' : ''}
              selectable={selectable}
              member={obj}
              selected={selected[obj.personal_info.email]}
              setSelectedStudents={setSelectedStudents}
              changeSelected={changeSelected}
            />
          )
        })}
      {selectedStudents && selectedStudents.length > 0 && <Text>Selected</Text>}
      {selectedStudents &&
        selectedStudents.map((obj, ind) => {
          const department_name =
            obj.academics?.department_name || obj.work_exp?.department_name
          const company_name =
            obj.work_exp?.company_name || obj.work_exp?.designation
          const subTitle =
            department_name && department_name + '⬩' + company_name

          return (
            <SearchTile
              key={ind}
              email={obj.personal_info.email}
              title={obj.personal_info.name}
              subTitle={subTitle}
              imageUrl={
                obj.user_id?.profilePic && `${Base_uri}${obj.user_id?.profilePic}`
              }
              handleClick={setAddressess}
              setAddressess={setAddressess}
              removeAddress={removeAddress}
              position={ind == results.length - 1 ? 'bottom' : ''}
              selectable={selectable}
              member={obj}
              selected={true}
              setSelectedStudents={setSelectedStudents}
              changeSelected={changeSelected}
            />
          )
        })}
    </ScrollView>
  )
}

SearchPageResults.propTypes = {
  results: PropTypes.array.isRequired,
  selectable: PropTypes.bool,
  setAddressess: PropTypes.func,
  removeAddress: PropTypes.func,
  selectedStudents: PropTypes.array,
  setSelectedStudents: PropTypes.func,
  studentSelected: PropTypes.bool
}

export default SearchPageResults
