import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { formatLink } from '../../utils/common/formatLink'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'

const NavBar = ({ isAdmin }) => {
    const dispatch = useDispatch()
    const { categories } = useSelector(state => state.app)
    useEffect(() => {
        dispatch(actions.getCategories())
    }, [])

    return (
        <div className={`w-full flex ${isAdmin ? 'justify-start' : 'justify-center'} bg-secondary1 text-white items-center h-[40px]`}>
            <div className='w-3/5 flex h-full items-center text-sm font-medium'>
                <NavLink to={'/'} className={
                    ({ isActive }) => isActive ? 'hover:bg-secondary2 py-2 px-4 flex items-center bg-secondary2' : 'hover:bg-secondary2 flex items-center py-2 px-4'}>
                    Home
                </NavLink>
                {categories?.length > 0 && categories.map((item) => {
                    return (
                        <div key={item.code} className='h-full flex justify-center items-center'>
                            <NavLink to={`/${formatLink(item.value)}`} className={
                                ({ isActive }) => isActive ? 'hover:bg-secondary2 py-2 px-4 flex items-center bg-secondary2' : 'hover:bg-secondary2 flex items-center py-2 px-4'}>
                                {item.value}
                            </NavLink>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default NavBar