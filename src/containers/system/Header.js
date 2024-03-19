import React from 'react'
import { NavBar } from '../public'

const Header = () => {
    return (
        <div className='w-full flex flex-none h-[40px]'>
            <div className='flex justify-center items-center font-bold bg-secondary1 text-white w-[256px] flex-none'>
                Rental Apartment
            </div>
            <div className='flex-auto'>
                <NavBar isAdmin={true} />
            </div>
        </div>
    )
}

export default Header