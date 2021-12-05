import React from 'react'
import Select from 'react-select'

const options = [
    { value: 'doctor', label: 'Doctor' },
    { value: 'nurse', label: 'Nurse' },
    { value: 'lab technician', label: 'Lab Technician' },
    { value: 'pharmacist', label: 'Pharmacist' }
]
const RoleSelect = () => {
    return ( 
        <Select options={options} />
     );
}
 
export default RoleSelect ;