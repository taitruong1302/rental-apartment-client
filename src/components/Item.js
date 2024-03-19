import React, { memo, useState } from 'react'
import { GrStar } from 'react-icons/gr'
import { RiHeartFill, RiHeartLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { formatLink } from '../utils/common/formatLink'
import avatar from '../assets/logo.png'

const indexes = [0, 1, 2, 3]
const Item = ({ images, address, attribute, description, star, title, user, id }) => {
    const [isHoverHeart, setIsHoverHeart] = useState(false)
    const handleStar = (star) => {
        let stars = []
        for (let i = 0; i < +star; i++) {
            stars.push(<GrStar className='star-item' color='yellow' size={18} />)
        }
        return stars
    }
    return (
        <div className='w-full flex border-t border-orange-600 py -4'>
            <Link to={`detail/${formatLink(title)}/${id}`} className='w-2/5 flex flex-wrap gap-[2px] items-center relative'>
                {images.length > 0 && images.filter((image, index) => indexes.some(i => i === index))?.map((item, index) => {
                    return (
                        <img key={index} src={item} alt="" className='w-[47%] h-[47%] object-cover' />
                    )
                })}
                <span className='bg-gray-700 text-white px-2 rounded-md absolute left-1 bottom-4'>{`${images.length} pics`}</span>
                <span
                    className='text-white absolute right-5 bottom-1'
                    onMouseOver={() => setIsHoverHeart(true)}
                    onMouseOut={() => setIsHoverHeart(false)}
                >
                    {isHoverHeart ? <RiHeartFill size={26} color='red' /> : <RiHeartLine size={26} />}

                </span>
            </Link>
            <div className='w-3/5'>
                <div className='flex justify-content gap-2'>
                    <Link to={`detail/${formatLink(title)}/${id}`}>
                        <span className='text-red-600 font-medium'>
                            {handleStar(+star).map((star, index) => {
                                return (
                                    <span key={index}>{star}</span>
                                )
                            })}
                            {title}
                        </span>
                    </Link>
                </div>
                <div className='my-2 flex items-center justify-between'>
                    <span className='font-bold flex-1 text-green-600 whitespace-nowrap overflow-hidden text-ellipsis'>
                        {attribute.price}
                    </span>
                    <span className='flex-1'>{attribute?.acreage}</span>
                    <span className='flex-1 whitespace-nowrap overflow-hidden text-ellipsis'>
                        {`${address.split(',')[address.split(',').length - 2]}${address.split(',')[address.split(',').length - 1]}`}
                    </span>
                </div>
                <p className='text-gray-500 w-full h-[100px] text-ellipsis overflow-hidden'>
                    {Array.isArray(description) ? description.map(item => item + ' ') : description}
                </p>
                <div className='flex items-center my-3 justify-between'>
                    <div className='flex items-center '>
                        <img src={avatar} alt="avatar" className='w-[30px] h[30px] object-cover rounded-full' />
                        <p className='px-2 max-w-[110px]'>{user?.name}</p>
                    </div>
                    <div className='flex items-center gap-1'>
                        <button type='button' className='bg-blue-700 text-white p-1 rounded-md'>
                            {`Call ${user.phone}`}
                        </button>
                        <button type='button' className='text-blue-700 px-1 rounded-md border border-blue-700'>
                            Send message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Item)