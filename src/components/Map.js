import React, { memo, useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react';
import { HiLocationMarker } from 'react-icons/hi';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'

const Position = ({ text }) => <div>{text}</div>

const Map = ({ address }) => {
    const [coords, setCoords] = useState(null)
    useEffect(() => {
        const getCoords = async () => {
            const result = await geocodeByAddress(address)
            const latLng = await getLatLng(result[0])
            setCoords(latLng)
        }
        if (address !== '') {
            getCoords()
        }
        else {
            setCoords({ lat: 10.7756587, lng: 106.7004238 })
        }
    }, [address])
    return (
        <div className='h-[300px] w-full relative'>
            {address && <div className='absolute top-[8px] left-[8px] max-w-[200px] z-50 rounded-md bg-white shadow-md p-4 text-xs'>
                {address}
            </div>}
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API }}
                defaultCenter={coords}
                defaultZoom={11}
                center={coords}
            >
                <Position lat={coords?.lat} lng={coords?.lng} text={<HiLocationMarker color='red' size={24} />} />
            </GoogleMapReact>
        </div>
    )
}

export default memo(Map)