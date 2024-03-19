import React, { useCallback, useEffect, useState } from 'react'
import { SearchItem, SearchModal } from '../../components'
import { BsChevronRight } from 'react-icons/bs'
import { HiOutlineLocationMarker, HiOutlineBackspace } from 'react-icons/hi'
import { FaMoneyBill } from 'react-icons/fa'
import { RiCrop2Line, RiSearchLine } from 'react-icons/ri'
import { BiBuildingHouse } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { useNavigate, createSearchParams, useLocation } from 'react-router-dom'
import { path } from '../../utils/constant'

const Search = () => {
    const navigate = useNavigate()
    const [isShowModal, setIsShowModal] = useState(false)
    const { areas, prices, acreage, categories } = useSelector(state => state.app)
    const [content, setContent] = useState([])
    const [name, setName] = useState('')
    const [queries, setQueries] = useState({})
    const [arrMinMax, setArrMinMax] = useState({})
    const [defaultText, setDefaultText] = useState('')
    const location = useLocation()

    useEffect(() => {
        if (!location?.pathname.includes(path.SEARCH)) {
            setArrMinMax({})
            setQueries({})
        }
    }, [location])

    const handleShowModal = (content, name, defaultText) => {
        setContent(content)
        setName(name)
        setIsShowModal(true)
        setDefaultText(defaultText)
    }

    const handleSubmit = useCallback((e, query, arrMaxMin) => {
        e.stopPropagation()
        setQueries(prev => ({ ...prev, ...query }))
        setIsShowModal(false)
        arrMaxMin && setArrMinMax(prev => ({ ...prev, ...arrMaxMin }))
    }, [queries, isShowModal])

    const handleSearch = () => {
        const queryCodes = Object.entries(queries).filter(item => item[0].includes('Code') || item[0].includes('Number')).filter(item => item[1])
        const queryCodesObj = {}
        queryCodes.forEach(item => {
            queryCodesObj[item[0]] = item[1]
        })
        navigate({
            pathname: path.SEARCH,
            search: createSearchParams(queryCodesObj).toString()
        })
    }
    return (
        <>
            <div className='w-3/5 p-[10px] my-3 bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2'>
                <span onClick={() => handleShowModal(categories, 'category', 'Find All')} className='cursor-pointer w-full flex-1'>
                    <SearchItem firstIcon={<BiBuildingHouse />} lastIcon={<HiOutlineBackspace />} fontWeight text={queries.category} defaultText={'Find All'} />
                </span>
                <span onClick={() => handleShowModal(areas, 'area', 'All Areas')} className='cursor-pointer w-full flex-1'>
                    <SearchItem firstIcon={<HiOutlineLocationMarker />} lastIcon={<BsChevronRight color='rgb(156, 163, 175)' />} text={queries.area} defaultText={'All Areas'} />
                </span>
                <span onClick={() => handleShowModal(prices, 'price')} className='cursor-pointer w-full flex-1'>
                    <SearchItem firstIcon={<FaMoneyBill />} lastIcon={<BsChevronRight color='rgb(156, 163, 175)' />} text={queries.price} defaultText={'All Price'} />
                </span>
                <span onClick={() => handleShowModal(acreage, 'acreage')} className='cursor-pointer w-full flex-1'>
                    <SearchItem firstIcon={<RiCrop2Line />} lastIcon={<BsChevronRight color='rgb(156, 163, 175)' />} text={queries.acreage} defaultText={'Acreage Range'} />
                </span>
                <button
                    type='button'
                    className='outline-none py-2 px-4 w-full bg-secondary1 text-sm text-[13.3px] flex flex-1 items-center justify-center gap-2 text-white font-medium'
                    onClick={handleSearch}
                >
                    <RiSearchLine />
                    Search
                </button>
            </div>
            {isShowModal && <SearchModal handleSubmit={handleSubmit} query={queries} arrMinMax={arrMinMax} content={content} name={name} setIsShowModal={setIsShowModal} defaultText={defaultText} />}
        </>
    )
}

export default Search