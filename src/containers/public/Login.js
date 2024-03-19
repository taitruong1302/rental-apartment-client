import React, { useEffect, useState } from 'react'
import { InputForm, Button } from '../../components'
import { useLocation, useNavigate } from 'react-router-dom'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import validate from '../../utils/common/validateFields'

const Login = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isRegister, setIsRegister] = useState(location.state?.isRegister)
    const [payload, setPayload] = useState({})
    const [invalidFields, setInvalidFields] = useState([])
    const { isLoggedIn } = useSelector(state => state.auth)
    useEffect(() => {
        setIsRegister(location.state?.isRegister)
        setPayload({ phone: '', name: '', password: '' })
    }, [location.state?.isRegister])

    useEffect(() => {
        isLoggedIn && navigate('/')
    }, [isLoggedIn])

    const handleSubmit = async () => {
        let finalPayload = isRegister ? payload : {
            phone: payload.phone,
            password: payload.password
        }
        let invalids = validate(finalPayload, setInvalidFields)
        if (invalids === 0) {
            isRegister ? dispatch(actions.register(payload)) : dispatch(actions.login(payload));
        }
    }

    return (
        <div className='w-full flex items-center justify-center'>
            <div className='bg-white min-w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm'>
                <h3 className='font-semibold text-2xl mb-3'>{!isRegister ? 'Login' : 'Sign up'}</h3>
                <div className='w-full flex flex-col gap-5'>
                    {isRegister && <InputForm setInvalidFields={setInvalidFields} invalidFields={invalidFields} label={'Full Name'} value={payload.name || ''} setValue={setPayload} typeValue={'name'} />}
                    <InputForm setInvalidFields={setInvalidFields} invalidFields={invalidFields} label={'Phone Number'} value={payload.phone || ''} type={'phone'} setValue={setPayload} typeValue={'phone'} />
                    <InputForm setInvalidFields={setInvalidFields} invalidFields={invalidFields} label={'Password'} type={'password'} value={payload.password || ''} setValue={setPayload} typeValue={'password'} />
                    <Button
                        text={isRegister ? 'Sign Up' : 'Login'}
                        bgColor={'bg-secondary1'}
                        textColor={'text-white'}
                        fullWidth
                        onClick={handleSubmit}
                    />
                </div>
                <div className='mt-7 flex items-center justify-between'>
                    {
                        isRegister ? (
                            <small>Already have an account? <span onClick={() => { setIsRegister(false); setPayload({ phone: '', password: '', name: '' }) }} className='text-[blue] hover:text-[red] cursor-pointer'>Login</span></small>
                        ) : (
                            <>
                                <small className='text-[blue] hover:text-[red] cursor-pointer'>Forgort Password</small>
                                <small className='text-[blue] hover:text-[red] cursor-pointer' onClick={() => { setIsRegister(true); setPayload({ phone: '', password: '', name: '' }) }}>Sign up</small>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Login