import React, { memo } from 'react'
import Slider from 'react-slick'

const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
}

const SliderCustom = ({ images }) => {
    return (
        <div className='w-full'>
            <Slider {...settings} infinite={images.length > 1 ? true : false}>
                {images?.length > 0 && images?.map((item, index) => {
                    return (
                        <div key={index} className='bg-black flex justify-center h-[320px] px-12'>
                            <img src={item} alt="" className='object-contain h-full m-auto' />
                        </div>
                    )
                })}

            </Slider>
        </div>
    )
}

export default memo(SliderCustom)