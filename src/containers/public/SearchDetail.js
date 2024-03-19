import React from 'react'
import { List, Pagination } from './index'
import { ItemSideBar, RelatedPost } from '../../components'
import { useSelector } from 'react-redux/'

const SearchDetail = () => {
    const { prices, acreage } = useSelector(state => state.app)




    return (
        <div className='w-full flex flex-col gap-3'>
            <div className='w-full flex gap-4'>
                <div className='w-[70%]'>
                    <List />
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

export default SearchDetail