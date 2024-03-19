import React from 'react'
import logo from '../assets/logo.png'
import { GrLocation, GrPhone } from 'react-icons/gr'
import { HiOutlineMailOpen } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='w-4/5 flex bg-white rounded-md shadow-md p-4 justify-between'>
            <img src={logo} alt="logo" className='h-[200px] object-contain' />
            <div className='flex flex-col'>
                <h3 className='font-semibold text-lg'>About Us</h3>
                <Link to={'/'} className='hover:text-orange-600'>Home</Link>
                <span>Introduce</span>
            </div>
            <div className='flex flex-col'>
                <h3 className='font-semibold text-lg'>Contact Us</h3>
                <span className='flex items-center'><GrLocation />Address: xxx</span>
                <span className='flex items-center'><GrPhone />Hotline: 0943xxxxxx</span>
                <span className='flex items-center'><HiOutlineMailOpen />rentalapartment@gmail.com</span>
            </div>
        </div>
    )
}

export default Footer