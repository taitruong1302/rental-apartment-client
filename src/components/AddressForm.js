import React, { useEffect, useState } from 'react'
import { Select, InputReadOnly } from '../components'
import { apiGetProvinces, apiGetDistrict } from '../services'
import { useSelector } from 'react-redux'

const AddressForm = ({ setPayload, invalidFields, setInvalidFields }) => {
    const { dataEdit } = useSelector(state => state.post)

    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [province, setProvince] = useState('')
    const [district, setDistrict] = useState('')
    const [reset, setReset] = useState(false)

    useEffect(() => {
        if (dataEdit.length > 0) {
            let addressArr = dataEdit?.address?.split(',')
            let foundProvince = provinces?.length > 0 && provinces?.find(item => item.province_name === addressArr[addressArr.length - 1]?.trim())
            setProvince(foundProvince ? foundProvince.province_id : '')
        }
    }, [provinces, dataEdit])

    useEffect(() => {
        if (dataEdit.length > 0) {
            let addressArr = dataEdit?.address?.split(',')
            let foundDistrict = districts?.length > 0 && districts?.find(item => item.district_name === addressArr[addressArr.length - 2]?.trim())
            setDistrict(foundDistrict ? foundDistrict.district_id : '')
        }
    }, [districts, dataEdit])

    useEffect(() => {
        const fetchProvinces = async () => {
            const response = await apiGetProvinces()
            if (response.status === 200) {
                setProvinces(response?.data?.results)
            }
        }
        fetchProvinces()
    }, [])
    useEffect(() => {
        setDistrict('')
        const fetchDistrict = async () => {
            const response = await apiGetDistrict(province)
            if (response.status === 200) {
                setDistricts(response.data?.results)
            }
        }
        province && fetchDistrict(province)
        !province ? setReset(true) : setReset(false)
        !province && setDistricts([])
    }, [province])

    useEffect(() => {
        setPayload(prev => ({
            ...prev,
            address: `${district ? `${districts?.find(item => item.district_id === district)?.district_name}, ` : ''}${province ? provinces?.find(item => item.province_id === province)?.province_name : ''}`,
            area: province ? provinces?.find(item => item.province_id === province)?.province_name : ''
        }))
    }, [province, district])
    return (
        <div>
            <h2 className='font-semibold text-xl py-4'>Address</h2>
            <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-4'>
                    <Select setInvalidFields={setInvalidFields} invalidFields={invalidFields} type='area' value={province} setValue={setProvince} label='City' options={provinces} />
                    <Select setInvalidFields={setInvalidFields} invalidFields={invalidFields} reset={reset} type='district' value={district} setValue={setDistrict} label='District' options={districts} />
                </div>
                <InputReadOnly label={'Address'} value={`${district ? `${districts?.find(item => item.district_id === district)?.district_name},` : ''} ${province ? provinces?.find(item => item.province_id === province)?.province_name : ''} `} />
            </div>
        </div>
    )
}

export default AddressForm