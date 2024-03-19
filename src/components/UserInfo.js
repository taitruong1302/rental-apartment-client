import React from 'react'
import { useSelector } from 'react-redux'
import avatar from '../assets/avatar.png'
import { blobToBase64 } from '../utils/common/toBase64'

const UserInfo = () => {
    const { currentUser } = useSelector(state => state.user)
    return (
        <div className='flex items-center gap-2'>
            <img src={currentUser?.avatar?.data.length > 0 ? blobToBase64(currentUser?.avatar) : avatar} alt="avatar" className='w-10 h-10 object-cover rounded-full shadow-md' />
            <div>
                <span>Welcome <span className='font-semibold'>{currentUser?.name}</span></span>
            </div>
        </div>
    )
}

export default UserInfo