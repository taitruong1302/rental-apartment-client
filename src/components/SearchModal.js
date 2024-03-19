import React, { useState, useEffect } from 'react'
import { GrPrevious } from 'react-icons/gr'
import { getNumberFromAcreage, getNumberFromPrice } from '../utils/common/getNumber'

const SearchModal = ({ setIsShowModal, content, name, handleSubmit, query, arrMinMax, defaultText }) => {
    const [percent1, setPercent1] = useState(name === 'price' && arrMinMax?.priceArr
        ? arrMinMax?.priceArr[0]
        : name === 'acreage' && arrMinMax?.acreageArr ? arrMinMax?.acreageArr[0] : 0)

    const [percent2, setPercent2] = useState(name === 'price' && arrMinMax?.priceArr
        ? arrMinMax?.priceArr[1]
        : name === 'acreage' && arrMinMax?.acreageArr ? arrMinMax?.acreageArr[1] : 100)

    const [activeButton, setActiveButton] = useState('')

    useEffect(() => {
        const activeTrackEl = document.getElementById('track-active')
        if (activeTrackEl) {
            if (percent2 <= percent1) {
                activeTrackEl.style.left = `${percent2}%`
                activeTrackEl.style.right = `${100 - percent1}%`
            }
            else {
                activeTrackEl.style.left = `${percent1}%`
                activeTrackEl.style.right = `${100 - percent2}%`
            }
        }


    }, [percent1, percent2])

    const handleClickSlider = (e, value) => {
        const sliderEl = document.getElementById('track')
        const sliderRect = sliderEl.getBoundingClientRect()
        let percent = value !== undefined ? value : Math.round((e.clientX - sliderRect.left) * 100 / sliderRect.width, 0)
        if (Math.abs(percent - percent1) <= (Math.abs(percent - percent2))) {
            setPercent1(percent)
        }
        else {
            setPercent2(percent)
        }
    }

    const convert100toTarget = percent => {
        return name === 'price'
            ? (Math.ceil(Math.round((percent * 1.5)) / 5) * 5) / 10
            : name === 'acreage'
                ? (Math.ceil(Math.round((percent * 0.9)) / 5) * 5)
                : 0
    }

    const convertToPercent = percent => {
        let target = name === 'price' ? 15 : name === 'acreage' ? 90 : 1
        return Math.floor((percent / target) * 100)
    }

    const handleActiveButton = (code, value) => {
        setActiveButton(code)
        let arrMaxMin = name === 'price' ? getNumberFromPrice(value) : getNumberFromAcreage(value)
        if (arrMaxMin.length === 1) {
            if (arrMaxMin[0] === 1) {
                setPercent1(0)
                setPercent2(convertToPercent(1))
            }
            if (arrMaxMin[0] === 20) {
                setPercent1(0)
                setPercent2(convertToPercent(20))
            }
            if (arrMaxMin[0] === 15 || arrMaxMin[0] === 90) {
                setPercent1(100)
                setPercent2(100)
            }
        }
        if (arrMaxMin.length === 2) {
            setPercent1(convertToPercent(arrMaxMin[0]))
            setPercent2(convertToPercent(arrMaxMin[1]))
        }
    }

    const handleBeforeSubmit = (e) => {
        let min = percent1 < percent2 ? percent1 : percent2
        let max = percent1 < percent2 ? percent2 : percent1
        let arrMinMax = (percent1 === percent2 && percent1 === 100) ? [convert100toTarget(100), 999999] : [convert100toTarget(percent1), convert100toTarget(percent2)]

        handleSubmit(e, {
            [`${name}Number`]: arrMinMax,
            [name]: (percent1 === percent2 && percent1 === 100) ? `Over ${convert100toTarget(min)} ${name === 'price' ? 'M' : 'm2'}` : `From ${convert100toTarget(min)} - ${convert100toTarget(max)} ${name === 'price' ? 'M' : 'm2'}`

        }, {
            [`${name}Arr`]: [min, max]
        })
    }


    return (
        <div onClick={(e) => { setIsShowModal(false) }}
            className='fixed top-0 left-0 right-0 bottom-0 z-20 bg-overlay-30 flex justify-center items-center'
        >
            <div onClick={(e) => {
                e.stopPropagation()
                setIsShowModal(true)
            }}
                className='w-2/5 h-[500px] bg-white rounded-md relative'
            >
                <div className='h-[45px] px-4 flex items-center border-b border-gray-200'>
                    <div className='hover:text-red-600 cursor-pointer' onClick={(e) => {
                        e.stopPropagation()
                        setIsShowModal(false)
                    }}>
                        <GrPrevious size={20} />
                    </div>
                </div>
                {(name === 'category' || name === 'area') &&
                    <div className='p-4 flex flex-col'>
                        <span className='py-2 flex gap-2 items-center border-b border-gray-200'>
                            <input
                                type="radio"
                                name={name}
                                value={defaultText || ''}
                                id='default'
                                checked={!query[`${name}Code`] ? true : false}
                                onChange={(e) => handleSubmit(e, { [name]: defaultText, [`${name}Code`]: null })}
                            />
                            <label htmlFor='default'>{defaultText}</label>
                        </span>
                        {content?.map(item => {
                            return (
                                <span key={item.code} className='py-2 flex gap-2 items-center border-b border-gray-200'>
                                    <input
                                        type="radio"
                                        name={name}
                                        id={item.code}
                                        value={item.code}
                                        onChange={(e) => handleSubmit(e, { [name]: item.value, [`${name}Code`]: item.code })}
                                        checked={item.code === query[`${name}Code`] ? true : false}
                                    />
                                    <label htmlFor={item.code}>{item.value}</label>
                                </span>
                            )
                        })}
                    </div>
                }
                {(name === 'price' || name === 'acreage') &&
                    <div className='p-12 py-20'>
                        <div className='flex flex-col items-center justify-center relative'>
                            <div className='z-30 absolute top-[-50px] font-semibold text-xl text-orange-600'>
                                {(percent1 === 100 && percent2 === 100)
                                    ? `Over ${convert100toTarget(percent1)} ${name === 'price' ? 'M' : 'm2'}+`
                                    : `From ${percent1 <= percent2
                                        ? convert100toTarget(percent1)
                                        : convert100toTarget(percent2)} - ${percent2 >= percent1
                                            ? convert100toTarget(percent2)
                                            : convert100toTarget(percent1)} ${name === 'price'
                                                ? 'M'
                                                : 'm2'}`}
                            </div>
                            <div onClick={handleClickSlider} id='track' className='slider-track h-[5px] bg-gray-300 rounded-full absolute top-0 bottom-0 w-full'></div>
                            <div onClick={handleClickSlider} id='track-active' className='slider-track-active h-[5px] bg-orange-600 rounded-full absolute top-0 bottom-0'></div>
                            <input
                                max='100'
                                min='0'
                                step='1'
                                type="range"
                                className='w-full appreance-none pointer-events-none absolute top-0 bottom-0'
                                value={percent1}
                                onChange={(e) => {
                                    setPercent1(+e.target.value)
                                    activeButton && setActiveButton('')
                                }} />
                            <input
                                max='100'
                                min='0'
                                step='1'
                                type="range"
                                className='w-full appreance-none pointer-events-none absolute top-0 bottom-0'
                                value={percent2}
                                onChange={(e) => {
                                    setPercent2(+e.target.value)
                                    activeButton && setActiveButton('')
                                }} />
                            <div className='absolute z-30 top-6 left-0 right-0 flex justify-between items-center'>
                                <span className='cursor-pointer'
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleClickSlider(e, 0)
                                    }}>
                                    0
                                </span>
                                <span className='mr-[-12px] cursor-pointer'
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleClickSlider(e, 100)
                                    }}>
                                    {name === 'price' ? '15M+' : name === 'acreage' ? 'Over 90m2' : ''}
                                </span>
                            </div>
                        </div>
                        <div className='mt-24'>
                            <div className='flex gap-2 items-center flex-wrap w-full '>
                                {content?.map(item => {
                                    return (
                                        <button
                                            key={item.code}
                                            onClick={() => handleActiveButton(item.code, item.value)}
                                            className={`px-4 py-2 bg-gray-200 rounded-md cursor-pointer ${item.code === activeButton ? 'bg-blue-500 text-white' : ''}`}>
                                            {item.value}
                                        </button>
                                    )
                                })}
                            </div>

                        </div>
                    </div>
                }
                {(name === 'price' || name === 'acreage') &&
                    <button
                        type='button'
                        className='w-full absolute bottom-0 bg-orange-400 py-2 font-medium rounded-bl-md rounded-br-md'
                        onClick={handleBeforeSubmit}>
                        Confirm
                    </button>}

            </div>
        </div>
    )
}

export default SearchModal