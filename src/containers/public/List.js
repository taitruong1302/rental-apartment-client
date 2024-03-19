import React, { useEffect, useState } from 'react'
import { Item } from '../../components'
import { getLimitPosts } from '../../store/actions/postAction'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const List = ({ categoryCode }) => {
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const { posts } = useSelector(state => state.post)
    const [sort, setSort] = useState(0)

    useEffect(() => {
        let params = []
        for (let entry of searchParams.entries()) {
            params.push(entry);
        }
        let searchParamsObject = {}
        params?.forEach(i => {
            if (Object.keys(searchParamsObject)?.some(item => item === i[0])) {
                searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
            } else {
                searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
            }
        })
        if (categoryCode) searchParamsObject.categoryCode = categoryCode
        if (sort === 1) searchParamsObject.order = ['createdAt', 'DESC']
        dispatch(getLimitPosts(searchParamsObject))
    }, [searchParams, categoryCode, sort])

    return (
        <div className='w-full p-2 bg-white shadow-md rounded-md px-6'>
            <div className='flex items-center justify-between'>
                <h4 className='text-xl font-semibold'>List Posts</h4>
                <span>Updated at:</span>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <span>Sort:</span>
                <span className={`bg-gray-200 p-2 rounded-md cursor-pointer hover:underline ${sort === 0 && 'text-red-500'}`} onClick={() => setSort(0)}>Default</span>
                <span className={`bg-gray-200 p-2 rounded-md cursor-pointer hover:underline ${sort === 1 && 'text-red-500'}`} onClick={() => setSort(1)}>Newest</span>
            </div>
            <div className='items'>
                {posts.length > 0 && posts.map(item => {
                    return (
                        <Item
                            key={item?.id}
                            address={item?.address}
                            attribute={item?.attribute}
                            description={JSON.parse(item?.description)}
                            images={JSON.parse(item?.images?.image)}
                            star={+item?.star}
                            title={item?.title}
                            user={item?.user}
                            id={item?.id}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default List