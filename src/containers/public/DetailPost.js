import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPostById } from '../../store/actions'
import { BoxInfo, Slider, Map, RelatedPost } from '../../components'
import { HiLocationMarker } from 'react-icons/hi'
import { FaMoneyBill } from 'react-icons/fa'
import { RiCrop2Line } from 'react-icons/ri'
import { BsStopwatch, BsHash } from 'react-icons/bs'


const DetailPost = () => {

    const { postId } = useParams()
    const dispatch = useDispatch()
    const { posts } = useSelector(state => state.post)

    useEffect(() => {
        if (postId) {
            dispatch(getPostById({ id: postId }))
        }
    }, [postId])


    return (
        <div className='w-full flex gap-4'>
            {!Array.isArray(posts) && (
                <div className='w-[70%]'>
                    <Slider images={JSON.parse(posts?.images?.image)} />
                    <div className='bg-white rounded-md shadow-md p-4'>
                        <div className='flex flex-col gap-2'>
                            <h2 className='text-xl font-semibold text-red-600 my-2'>{posts?.title}</h2>
                            <div className='flex items-center gap-2'>
                                <span>Subject:</span>
                                <span className='text-blue-600 underline font-medium hover:text-orange-600 cursor-pointer'>{posts?.overview?.area}</span>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <HiLocationMarker color='#2563eb' />
                                <span>{posts?.address}</span>
                            </div>
                            <div className='flex items-center justify-between'>
                                <span className='flex items-center gap-1'>
                                    <FaMoneyBill />
                                    <span className='font-semibold text-lg text-green-600'>{posts?.attribute?.price}</span>
                                </span>
                                <span className='flex items-center gap-1'>
                                    <RiCrop2Line />
                                    <span>{posts?.attribute?.acreage}</span>
                                </span>
                                <span className='flex items-center gap-1'>
                                    <BsStopwatch />
                                    <span>{posts?.attribute?.published}</span>
                                </span>
                                <span className='flex items-center gap-1'>
                                    <BsHash />
                                    <span>{posts?.attribute?.hashtag}</span>
                                </span>
                            </div>
                        </div>
                        <div className='mt-8'>
                            <h3 className='font-semibold text-xl'>Description</h3>
                            <div className='flex flex-col gap-3'>
                                {posts?.description && Array.isArray(JSON.parse(posts?.description)) ? JSON.parse(posts?.description)?.map((item, index) => {
                                    return (
                                        <span key={index}>{item}</span>
                                    )
                                }) :
                                    <span>{posts?.description && JSON.parse(posts?.description)}</span>
                                }
                            </div>
                        </div>
                        <div className='mt-8'>
                            <h3 className='font-semibold text-xl'>Detail</h3>
                            <table className='w-full'>
                                <tbody className='w-full'>
                                    <tr className='w-full'>
                                        <td className='p-2'>Id</td>
                                        <td className='p-2'>{posts?.overview.code}</td>
                                    </tr>
                                    <tr className='w-full bg-gray-200'>
                                        <td className='p-2'>Area</td>
                                        <td className='p-2'>{posts?.overview.area}</td>
                                    </tr>
                                    <tr className='w-full'>
                                        <td className='p-2'>Type</td>
                                        <td className='p-2'>{posts?.overview.bonus}</td>
                                    </tr>
                                    <tr className='w-full bg-gray-200'>
                                        <td className='p-2'>Target</td>
                                        <td className='p-2'>{posts?.overview.target}</td>
                                    </tr>
                                    <tr className='w-full'>
                                        <td className='p-2'>Created at</td>
                                        <td className='p-2'>{posts?.overview.created}</td>
                                    </tr>
                                    <tr className='w-full bg-gray-200'>
                                        <td className='p-2'>Expired at</td>
                                        <td className='p-2'>{posts?.overview.expired}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='mt-8'>
                            <h3 className='font-semibold text-xl'>Contact Information</h3>
                            <table className='w-full'>
                                <tbody className='w-full'>
                                    <tr className='w-full'>
                                        <td className='p-2'>Name</td>
                                        <td className='p-2'>{posts?.user.name}</td>
                                    </tr>
                                    <tr className='w-full bg-gray-200'>
                                        <td className='p-2'>Phone Number</td>
                                        <td className='p-2'>{posts?.user.phone}</td>
                                    </tr>
                                    <tr className='w-full'>
                                        <td className='p-2'>Zalo</td>
                                        <td className='p-2'>{posts?.user.zalo}</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                        <div className='mt-8'>
                            <h3 className='font-semibold text-xl'>Map</h3>
                            <Map address={posts.address} />
                        </div>
                    </div>
                </div>
            )}
            <div className='w-[30%] flex flex-col gap-8'>
                <BoxInfo userInfo={posts?.user} />
                <RelatedPost />
            </div>

        </div>
    )
}

export default DetailPost