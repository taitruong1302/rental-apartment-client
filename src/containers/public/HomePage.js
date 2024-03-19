import React from 'react'
import { List, Pagination } from './index'
import { Location, ItemSideBar, RelatedPost } from '../../components'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux/'



const HomePage = () => {
    let [searchParams] = useSearchParams();
    const { categories, prices, acreage } = useSelector(state => state.app)

    return (
        <div className='w-full flex flex-col gap-3'>
            <Location />
            <div className='w-full flex gap-4'>
                <div className='w-[70%]'>
                    <List />
                    <Pagination page={searchParams.get('page')} />
                </div>
                <div className='w-[30%] flex flex-col gap-4 justify-start items-center'>
                    <ItemSideBar content={categories} title={'List Rental Apartmenrt'} />
                    <ItemSideBar isDouble={true} type='priceCode' content={prices} title={'View by Price'} />
                    <ItemSideBar isDouble={true} type='acreageCode' content={acreage} title={'View by Acreage'} />
                    <RelatedPost />
                </div>
            </div>
        </div>
    )
}

export default HomePage