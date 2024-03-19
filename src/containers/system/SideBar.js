import React from 'react'
import avatar from '../../assets/avatar.png'
import { useSelector, useDispatch } from 'react-redux'
import menuSideBar from '../../utils/menuSideBar'
import { NavLink } from 'react-router-dom'
import * as actions from '../../store/actions'
import { LuLogOut } from 'react-icons/lu'
import { blobToBase64 } from '../../utils/common/toBase64'

const activeStyle = 'hover:bg-gray-200 flex rounded-md items-center gap-2 py-2 text-bold bg-gray-200'
const inactiveStyle = 'hover:bg-gray-200 flex rounded-md items-center gap-2 py-2 cursor-pointer'

const SideBar = () => {
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.user)
    return (
        <div className='w-[256px] flex-none p-4 flex flex-col gap-6'>
            <div className='flex'>
                <img src={currentUser?.avatar?.data.length > 0 ? blobToBase64(currentUser?.avatar) : avatar} alt="avatar" className='w-12 h-12 object-cover rounded-full border-white' />
                <div className='flex flex-col justify-center'>
                    <span className='font-semibold'>{currentUser?.name}</span>
                    <small>{currentUser?.phone}</small>
                </div>
            </div>
            <div>
                {menuSideBar.map(item => {
                    return (
                        <NavLink
                            className={({ isActive }) => isActive ? activeStyle : inactiveStyle}
                            key={item.id}
                            to={item?.path}
                        >
                            {item?.icon}
                            {item.text}
                        </NavLink>
                    )
                })}
                <span onClick={() => dispatch(actions.logout())} className={inactiveStyle}><LuLogOut />Exit</span>
            </div>
        </div>
    )
}

export default SideBar