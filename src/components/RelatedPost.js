import React, { useEffect } from 'react'
import { SmallItem } from './index'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../store/actions'

const RelatedPost = () => {
    const { newPosts } = useSelector(state => state.post)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actions.getNewPosts())
    }, [])
    return (
        <div className='w-full bg-white rounded-md p-4'>
            <h3 className='font-semibold text-lg mb-4'>New Posts</h3>
            <div className='flex flex-col w-full gap-2'>
                {newPosts.map(item => {
                    return (
                        <SmallItem key={item.id} image={JSON.parse(item.images.image)} title={item.title} price={item?.attribute?.price} createdAt={item.createdAt} />
                    )
                })}

            </div>
        </div>
    )
}

export default RelatedPost