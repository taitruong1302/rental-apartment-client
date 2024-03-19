import React, { useEffect, useState } from 'react'
import { AddressForm, Button, DetailForm } from '../../components'
import { FiCamera } from 'react-icons/fi'
import { ImBin } from "react-icons/im"
import { useSelector } from 'react-redux'
import { apiUpdatePost, apiUploadImages } from '../../services'
import Loading from '../../components/Loading'
import { getCodesAcreage, getCodesPrice } from '../../utils/common/getCodes'
import { apiCreateNewPost } from '../../services'
import Swal from 'sweetalert2'
import validate from '../../utils/common/validateFields'
import { useDispatch } from 'react-redux'
import { resetEditData } from '../../store/actions'
import Map from '../../components/Map'

const CreatePost = ({ isEdit }) => {
    const { dataEdit } = useSelector(state => state.post)
    const dispatch = useDispatch()
    const [payload, setPayload] = useState(() => {
        const initData = {
            categoryCode: dataEdit?.categoryCode || '',
            title: dataEdit?.title || '',
            priceNumber: dataEdit?.priceNumber * 1000000 || 0,
            acreageNumber: dataEdit?.acreageNumber || 0,
            images: dataEdit?.images?.image ? JSON.parse(dataEdit?.images?.image) : '',
            address: dataEdit?.address || '',
            priceCode: dataEdit?.priceCode || '',
            acreageCode: dataEdit?.acreageNumber || '',
            description: dataEdit?.description ? JSON.parse(dataEdit?.description) : '',
            target: dataEdit?.overview?.target || '',
            area: dataEdit?.area || ''
        }
        return initData
    })
    const [imagesPreview, setImagesPreview] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { prices, categories, acreage } = useSelector(state => state.app)
    const { currentUser } = useSelector(state => state.user)
    const [invalidFields, setInvalidFields] = useState([])
    useEffect(() => {
        if (dataEdit) {
            let images = dataEdit?.images?.image && JSON.parse(dataEdit?.images?.image)
            images && setImagesPreview(images)
        }
    }, [dataEdit])
    const handleFiles = async (e) => {
        e.stopPropagation()
        setIsLoading(true)
        let images = []
        let files = e.target.files
        let formData = new FormData()
        for (let i of files) {
            formData.append('file', i)
            formData.append('upload_preset', process.env.REACT_APP_UPLOAD_ASSET_NAME)
            let response = await apiUploadImages(formData)
            if (response.status === 200) images = [...images, response.data?.secure_url]
        }
        setIsLoading(false)
        setImagesPreview(prev => [...prev, ...images])
        setPayload(prev => ({ ...prev, images: [...prev.images, ...images] }))
    }
    const handleDeleteImage = (image) => {
        setImagesPreview(prev => prev?.filter(item => item !== image))
        setPayload(prev => ({
            ...prev,
            images: prev.images?.filter(item => item !== image)
        }))
    }

    const handleSubmit = async () => {
        let priceCodeArr = getCodesPrice([+payload.priceNumber, +payload.priceNumber], prices)
        let priceCode = priceCodeArr[priceCodeArr.length - 1]?.code
        let acreageCodeArr = getCodesAcreage(+payload.acreageNumber, acreage, 0, 90)
        let acreageCode = acreageCodeArr[0]?.code
        let finalPayload = {
            ...payload,
            priceCode,
            acreageCode,
            userId: currentUser.id,
            priceNumber: +payload.priceNumber / Math.pow(10, 6),
            target: payload.target || 'All',
            label: `${categories?.find(item => item.code === payload?.categoryCode)?.value} ${payload?.address?.split(',')[0]}`
        }

        const result = validate(finalPayload, setInvalidFields)
        if (result === 0) {
            if (isEdit) {
                finalPayload.postId = dataEdit?.id
                finalPayload.attributeId = dataEdit?.attributeId
                finalPayload.imagesId = dataEdit?.imagesId
                finalPayload.overviewId = dataEdit?.overviewId

                const response = await apiUpdatePost(finalPayload)
                if (response?.data.err === 0) {
                    Swal.fire('Success', 'Post is updated successfully', 'success').then(() => {
                        resetPayload()
                    })
                    dispatch(resetEditData())
                }
                else {
                    Swal.fire('Oops!', 'Error when creating post', 'error')
                }
            }
            const response = await apiCreateNewPost(finalPayload)
            if (response?.data.err === 0) {
                Swal.fire('Success', 'New post is created', 'success').then(() => {
                    resetPayload()
                })
            }
            else {
                Swal.fire('Oops!', 'Error when creating post', 'error')
            }
        }
    }

    const resetPayload = () => {
        setPayload({
            categoryCode: '',
            title: '',
            priceNumber: 0,
            acreageNumber: 0,
            images: '',
            address: '',
            priceCode: '',
            acreageCode: '',
            description: '',
            target: '',
            area: ''
        })
    }

    return (
        <div className='px-6'>
            <h1 className='text-3xl font-medium py-4 border-b border-gray-200'>{isEdit ? 'Edit Post' : 'New Post'}</h1>
            <div className='flex gap-4'>
                <div className='py-4 flex flex-col gap-8 flex-auto'>
                    <AddressForm payload={payload} setPayload={setPayload} invalidFields={invalidFields} setInvalidFields={setInvalidFields} />
                    <DetailForm payload={payload} setPayload={setPayload} invalidFields={invalidFields} setInvalidFields={setInvalidFields} />
                    <div className='w-full'>
                        <h2 className='font-semibold text-xl py-4'>Images</h2>
                        <div className='w-full'>
                            <label className='w-full border-2 h-[200px] my-4 border-dashed rounded-md flex items-center justify-center border-gray-400' htmlFor='file'>
                                {isLoading
                                    ? <Loading />
                                    : <div className='flex flex-col items-center justify-center'>
                                        <FiCamera size={50} />Add image
                                    </div>
                                }
                            </label>
                            <input hidden type="file" id='file' multiple onChange={handleFiles} />
                            <small className='text-red-500'>
                                {invalidFields?.some(item => item.name === 'images') && invalidFields?.find(item => item.name === 'images')?.message}
                            </small>
                            <div className='w-full'>
                                <h3 className='font-medium py-4'>Images selected</h3>
                                <div className='flex gap-4 items-center'>
                                    {imagesPreview?.map(item => {
                                        return (
                                            <div key={item} className='relative w-1/3 h-1/3 '>
                                                <img src={item} alt="preview" className='w-full h-full object-cover rounded-md' />
                                                <span
                                                    title='Xóa'
                                                    onClick={() => handleDeleteImage(item)}
                                                    className='absolute top-0 right-0 p-2 cursor-pointer bg-gray-300 hover:bg-gray-400 rounded-full'
                                                >
                                                    <ImBin />
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button onClick={handleSubmit} text={isEdit ? 'Edit Post' : 'Create New'} bgColor={'bg-green-600'} textColor={'text-white'} />
                </div>
                <div className='w-[30%] flex-none'>
                    <Map address={payload.address} />
                </div>
            </div>
        </div>
    )
}

export default CreatePost