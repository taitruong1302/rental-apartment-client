import React from 'react'
import { location } from '../utils/constant'
import LocationBtn from './LocationBtn'

const Location = () => {
    return (
        <div className='flex items-center gap-5 justify-center py-5'>
            {location.map(item => {
                return (
                    <LocationBtn
                        key={item.id}
                        name={item.name}
                        image={item.image}
                        provinceCode={item.provinceCode}
                    />
                )
            })}

        </div>
    )
}

export default Location