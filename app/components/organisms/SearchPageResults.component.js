import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { ScrollView, Text } from 'react-native'
import SearchTile from '../atoms/SearchTile.component'
import { setProfileSelected } from '../../redux/slices/profileSelected.slice'
import { navigateTo } from '../../helpers/navigation.helper'
import { useDispatch } from 'react-redux'
import { getProfile } from '../../apis/profile.api'
import { apiWrapper } from '../../utils/wrapper.api'

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
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
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
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
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
