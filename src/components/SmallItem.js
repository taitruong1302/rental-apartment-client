import React from 'react'
import moment from 'moment'

const SmallItem = ({ title, price, image, createdAt }) => {
    return (
        <div className='w-full flex items-center gap-1 py-2 border-b border-gray-300'>
            <img src={image[0]} alt="logo" className='w-[65px] h-[65px] object-cover rounded-md flex-none' />
            <div className='w-full flex-auto flex flex-col justify-between gap-2'>
                <h4 className='text-blue-600 text-[14px]'>{`${title?.slice(0, 45)}...`}</h4>
                <div className='flex items-center justify-between w-full'>
                    <span className='text-sm font-medium text-green-500'>{price}</span>
                    <span className='text-sm text-gray-300'>{moment(createdAt).fromNow()}</span>
                </div>
            </div>
        </div>
    )
}

export default SmallItem