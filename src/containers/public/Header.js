import React, { useCallback, useEffect, useRef, useState } from 'react'
import logo from '../../assets/logo.png'
import { Button, UserInfo } from '../../components'
import { TiUserAddOutline } from 'react-icons/ti'
import { FiLogIn } from 'react-icons/fi'
import { AiOutlineDown } from 'react-icons/ai'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { path } from '../../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from "../../store/actions"
import menuManagement from '../../utils/menuManagament'
import { LuLogOut } from 'react-icons/lu'

const Header = () => {
    const navigate = useNavigate()
    const { isLoggedIn } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const headerRef = useRef()
    const [searchParams] = useSearchParams()
    const [isShowMenu, setIsShowMenu] = useState(false)

    const goToLogin = useCallback((flag) => {
        navigate(path.LOGIN, { state: { isRegister: flag } })
    })
    const goToHome = useCallback(() => {
        navigate(path.HOME)
    })
    useEffect(() => {
        headerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, [searchParams.get('page')])

    return (
        <div ref={headerRef} className='w-3/5'>
            <div className='w-full flex items-center justify-between'>
                <img src={logo} className='h-[70px] w-[240px] object-contain hover:cursor-pointer' alt='logo' onClick={goToHome} />
                <div className='flex items-center gap-1'>
                    {!isLoggedIn &&
                        <div className='flex items-center gap-1'>
                            <Button
                                text='Login'
                                textColor='text-white'
                                bgColor='bg-[#3961fb]'
                                ButtonIcon={FiLogIn}
                                onClick={() => goToLogin(false)}
                            />
                            <Button
                                text='Sign up'
                                textColor='text-white'
                                bgColor='bg-[#3961fb]'
                                ButtonIcon={TiUserAddOutline}
                                onClick={() => goToLogin(true)}
                            />
                        </div>
                    }
                    {isLoggedIn &&
                        <div className='flex items-center gap-3 relative'>
                            <UserInfo />
                            <Button
                                text='Manage Account'
                                textColor='text-white'
                                bgColor='bg-[#3961fb]'
                                ButtonIcon={AiOutlineDown}
                                px='px-4'
                                onClick={() => setIsShowMenu(prev => !prev)}
                            />
                            {isShowMenu && <div className='absolute top-full right-0 bg-white shadow-md rounded-md p-4 min-w-[200px] flex flex-col gap-2'>
                                {menuManagement.map(item => {
                                    return (
                                        <Link className='hover:text-orange-600 flex items-center gap-2 text-blue-600 border-b border-gray-200 py-2' key={item.id} to={item?.path}>
                                            {item?.icon}
                                            {item.text}
                                        </Link>
                                    )
                                })}
                                <span className='cursor-pointer hover:text-orange-600 text-blue-500 py-2 flex gap-2 items-center' onClick={() => {
                                    dispatch(actions.logout())
                                    goToLogin(false)
                                }}>
                                    {<LuLogOut />}Logout
                                </span>
                            </div>}

                        </div>
                    }
                    <Button
                        text='New Post'
                        textColor='text-white'
                        bgColor='bg-secondary2'
                        onClick={() => navigate(`${path.SYSTEM}${path.CREATE_POST}`)}
                    />
                </div>

            </div>
        </div>

    )
}

export default Header