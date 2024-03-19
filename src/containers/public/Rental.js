import React, { useEffect, useState } from 'react'
import { List, Pagination } from './index'
import { Location, ItemSideBar, RelatedPost } from '../../components'
import { useSelector } from 'react-redux/'
import { useLocation, useParams } from 'react-router-dom'
import { formatLink } from '../../utils/common/formatLink'

const Rental = () => {
    const { categories, prices, acreage } = useSelector(state => state.app)
    const [categoryCode, setCategoryCode] = useState('none')
    const location = useLocation()
    const params = useParams()

    useEffect(() => {
        const category = categories?.find(item => `/${formatLink(item.value)}` === location.pathname) || params
        if (category) {
            setCategoryCode(category.code)
        }
    }, [location])

    return (
        <div className='w-full flex flex-col gap-3'>
            <Location />
            <div className='w-full flex gap-4'>
                <div className='w-[70%]'>
                    <List categoryCode={categoryCode} />
                    <Pagination />
                </div>
                <div className='w-[30%] flex flex-col gap-4 justify-start items-center'>
                    <ItemSideBar isDouble={true} type='priceCode' content={prices} title={'View by Price'} />
                    <ItemSideBar isDouble={true} type='acreageCode' content={acreage} title={'View by Acreage'} />
                    <RelatedPost />
                </div>
            </div>
        </div>
    )
}

export default Rental