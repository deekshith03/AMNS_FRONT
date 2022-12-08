import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView, Text } from "react-native";
import SearchTile from '../atoms/SearchTile.component';

export const SearchResults = ({ results, selectable, setAddressess, removeAddress, selectedStudents, setSelectedStudents }) => {
  console.log("🚀 ~ file: SearchResults.compononts.js:7 ~ SearchResults ~ selectedStudents", selectedStudents)
  return <ScrollView>
    {results && results.map((obj, ind) => {
      const department_name = obj.academics?.department_name || obj.work_exp?.department_name
      const company_name = obj.work_exp?.company_name || obj.work_exp?.designation
      const subTitle = department_name && (department_name + '⬩') + company_name

      return <SearchTile
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
        position={ind == results.length - 1 ? "bottom" : ""}
        selectable={selectable}
        member={obj}
        selected={false}
        setSelectedStudents={setSelectedStudents}
      />
    })}
    {selectedStudents.length > 0 && <Text>Selected</Text>}
    {selectedStudents && selectedStudents.map((obj, ind) => {
      const department_name = obj.academics?.department_name || obj.work_exp?.department_name
      const company_name = obj.work_exp?.company_name || obj.work_exp?.designation
      const subTitle = department_name && (department_name + '⬩') + company_name

      return <SearchTile
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
        position={ind == results.length - 1 ? "bottom" : ""}
        selectable={selectable}
        member={obj}
        selected={true}
        setSelectedStudents={setSelectedStudents}
      />
    })}
  </ScrollView>
}

SearchResults.propTypes = {
  results: PropTypes.array.isRequired,
  selectable: PropTypes.bool,
  setAddressess: PropTypes.func,
  removeAddress: PropTypes.func,
  selectedStudents: PropTypes.array,
  setSelectedStudents: PropTypes.func
}