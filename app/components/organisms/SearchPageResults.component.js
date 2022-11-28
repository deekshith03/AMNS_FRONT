import { ScrollView } from 'react-native'
import React from 'react'
import SearchTile from '../atoms/SearchTile.component'
import PropTypes from 'prop-types'

const SearchPageResults = ({ searchPhraseResults, studentSelected }) => {
  return (
    <ScrollView>
      {searchPhraseResults.length > 0 ? (
        <ScrollView keyboardShouldPersistTaps={'always'}>
          {searchPhraseResults.map((value, ind) => {
            let department_name = ''
            if (value.academics && studentSelected) {
              department_name = value.academics.department_name
                ? value.academics.department_name
                : ''
            } else if (value.work_exp && !studentSelected) {
              department_name = value.work_exp.department_name
                ? value.work_exp.department_name
                : ''
            }
            let company_name = ''

            if (value.work_exp && studentSelected) {
              company_name = value.work_exp.company_name
                ? value.work_exp.company_name
                : ''
            } else if (value.work_exp && !studentSelected) {
              company_name = value.work_exp.designation
                ? value.work_exp.designation
                : ''
            }

            let subTitle = ''
            if (department_name.length > 0 && company_name.length > 0) {
              subTitle = department_name + '⬩' + company_name
            } else {
              subTitle =
                department_name.length > 0
                  ? department_name
                  : company_name.length > 0
                  ? company_name
                  : ''
            }

            if (ind == searchPhraseResults.length - 1) {
              return (
                <SearchTile
                  key={ind}
                  title={value.personal_info.name}
                  subTitle={subTitle}
                  imageUrl={
                    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                  }
                  position="bottom"
                  handleClick={() => {
                    console.log('profile clicked')
                  }}
                />
              )
            }
            return (
              <SearchTile
                key={ind}
                title={value.personal_info.name}
                subTitle={subTitle}
                imageUrl={
                  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                }
                handleClick={() => {
                  console.log('profile clicked')
                }}
              />
            )
          })}
        </ScrollView>
      ) : null}
    </ScrollView>
  )
}

SearchPageResults.propTypes = {
  searchPhraseResults: PropTypes.array.isRequired,
  studentSelected: PropTypes.bool.isRequired
}

export default SearchPageResults
