import React from 'react'
import { Select, InputReadOnly, InputFormV2 } from './'
import { useSelector } from 'react-redux'


const targets = [
    { code: 'male', value: 'male' },
    { code: 'female', value: 'female' },
    { code: 'all', value: 'all' }
]

const DetailForm = ({ payload, setPayload, invalidFields, setInvalidFields }) => {
    const { categories } = useSelector(state => state.app)
    const { currentUser } = useSelector(state => state.user)
    const { dataEdit } = useSelector(state => state.post)
    return (
        <div>
            <h2 className='font-semibold text-xl py-4'>Details</h2>
            <div className='w-full flex flex-col gap-4'>
                <div className='w-1/2'>
                    <Select value={payload.categoryCode} setValue={setPayload} name='categoryCode' label="Type of post" options={categories} invalidFields={invalidFields} setInvalidFields={setInvalidFields} />
                </div>
                <InputFormV2 label={'Subject'} name='title' value={payload.title} setValue={setPayload} setInvalidFields={setInvalidFields} />
                <div className='flex flex-col gap-2'>
                    <label htmlFor='description'>Description</label>
                    <textarea id='description' cols={30} rows={10} className='w-full rounded-md border outline-none border-gray-300 p-2' onFocus={() => setInvalidFields([])} value={payload.description} onChange={e => setPayload(prev => ({ ...prev, description: e.target.value }))} />
                    <small className='text-red-500'>
                        {invalidFields?.some(item => item.name === 'description') && invalidFields?.find(item => item.name === 'description')?.message}
                    </small>
                </div>
                <div className='w-1/2 '>
                    <InputReadOnly label={'Contact Information'} value={currentUser?.name || currentUser?.username} />
                    <InputReadOnly label={'Phone Number'} value={currentUser?.phone} />
                    <InputFormV2 value={payload.priceNumber} setValue={setPayload} label='Price' unit={'VND'} name='priceNumber' invalidFields={invalidFields} setInvalidFields={setInvalidFields} />
                    <InputFormV2 value={payload.acreageNumber} setValue={setPayload} label='Acreage' unit={'m2'} name='acreageNumber' invalidFields={invalidFields} setInvalidFields={setInvalidFields} />
                    <Select value={payload.target || dataEdit?.overview?.target} setValue={setPayload} name='target' options={targets} label={"For"} invalidFields={invalidFields} setInvalidFields={setInvalidFields} />
                </div>

            </div>
        </div>
    )
}

export default DetailForm