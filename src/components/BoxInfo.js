import React, { memo } from 'react'
import avatar from '../assets/avatar.png'
import Button from './Button'
import { BsTelephoneFill } from 'react-icons/bs'
import { SiZalo } from 'react-icons/si'

const BoxInfo = ({ userInfo }) => {
    console.log(userInfo);
    return (
        <div className='w-full bg-yellow-500 rounded-md flex flex-col items-center justify-center p-4 gap-2'>
            <img src={avatar} alt="avatar" className='w-16 h-16 object-contain rounded-full' />
            <h3 className='font-medium text-lx'>{userInfo?.name}</h3>
            <Button
                text={userInfo?.phone}
                bgColor={"bg-[#13BB7B]"}
                fullWidth
                textColor={"text-white font-bold text-lg"}
                ButtonIcon={BsTelephoneFill}
            />
            <a className='bg-white py-2 flex items-center justify-center w-full rounded-md font-bold text-lg' href={`https://zalo.me/${userInfo?.zalo}`}>
                <SiZalo color='blue' size={35} />
            </a>
        </div>
    )
}

export default memo(BoxInfo)