import React, { memo } from 'react'

const SearchItem = ({ firstIcon, lastIcon, text, fontWeight, defaultText }) => {
    return (
        <div className='bg-white py-2 px-4 w-full p-2 rounded-md text-gray-400 text-sm flex items-center justify-between text-[13.3px]'>
            <div className='flex items-center gap-1'>
                {firstIcon}
                <span className={`${fontWeight && 'font-medium text-black'} w-full ${text ? 'font-medium text-black' : ''} text-ellipsis overflow-hidden whitespace-nowrap`}>{text || defaultText}</span>
            </div>
            {lastIcon}
        </div>
    )
}

export default memo(SearchItem)