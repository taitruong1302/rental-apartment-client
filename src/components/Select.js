import React from 'react'

const Select = ({ label, options, value, setValue, type, reset, name, invalidFields, setInvalidFields }) => {
    const handleTextError = () => {
        let nameInvalid = invalidFields?.find(item => item.name === name)
        let addressInvalid = invalidFields?.find(item => item.name === 'address')

        return `${nameInvalid ? nameInvalid.message : ''}` || `${addressInvalid ? addressInvalid.message : ''}`
    }
    return (
        <div className='flex flex-col gap-2 flex-1'>
            <label className='font-medium' htmlFor='select-address'>{label}</label>
            <select
                value={reset ? '' : value}
                id='select-address'
                className='outline-none border border-gray-300 px-1 w-full rounded-md'
                onChange={(e) => !name ? setValue(e.target.value) : setValue(prev => ({ ...prev, [name]: e.target.value }))}
                onFocus={() => {
                    setInvalidFields([])
                }}
            >
                <option value="">{`--Select ${label}--`}</option>
                {options?.map(item => {
                    return (
                        <option
                            value={type === 'area' ? item?.province_id : type === 'district' ? item?.district_id : item?.code}
                            key={type === 'area' ? item?.province_id : type === 'district' ? item?.district_id : item?.code}
                        >
                            {type === 'area' ? item?.province_name : type === 'district' ? item?.district_name : item?.value}
                        </option>
                    )
                })}
            </select>
            {invalidFields && <small className='text-red-500'>
                {handleTextError()}
            </small>}
        </div>
    )
}

export default Select