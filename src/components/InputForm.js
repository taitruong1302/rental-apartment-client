import React, { memo } from 'react'

const InputForm = ({ label, type, value, setValue, typeValue, invalidFields, setInvalidFields }) => {
    return (
        <div>
            <label htmlFor='phone' className='text-sm'>{label}</label>
            <input
                type={type || 'text'}
                id={typeValue}
                className='outline-none bg-[#e8f0fe] rounded-md w-full p-2'
                value={value}
                onChange={e => setValue(prev => ({ ...prev, [typeValue]: e.target.value }))}
                onFocus={() => setInvalidFields([])}
            />
            {invalidFields.length > 0 && invalidFields.some(i => i.name === typeValue) && <small className='text-red-500 italicy'>{invalidFields.find(i => i.name === type)?.message}</small>}
        </div>
    )
}

export default memo(InputForm)