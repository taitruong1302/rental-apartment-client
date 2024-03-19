import React, { memo } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { path } from '../utils/constant'

const LocationBtn = ({ name, image, provinceCode }) => {
    const navigate = useNavigate()

    const handleOnClick = () => {
        navigate({
            pathname: path.SEARCH,
            search: createSearchParams(provinceCode).toString()
        })
    }

    return (
        <div
            className='shadow-md rounded-bl-md rounded-br-md text-blue-600 hover:text-orange-600 cursor-pointer'
            onClick={handleOnClick}
        >
            <img src={image} alt={name} className='w-full h-[110px] object-cover rounded-tl-md rounded-tr-md' />
            <div className='font-medium p-2 text-center'>{name}</div>
        </div>
    )
}

export default memo(LocationBtn)