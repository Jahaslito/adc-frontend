import React from 'react'
import Select from 'react-select'

const options = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
]
const GenderSelect = () => {
    return ( 
        <Select options={options} />
     );
}
 
export default GenderSelect ;