import React from 'react'
import { CreatePost } from '../containers/system'

const UpdatePost = ({ isEdit, setIsEdit }) => {
  return (
    <div
      className='absolute top-0 left-0 right-0 bottom-0 bg-overlay-70 flex justify-center'
      onClick={e => {
        e.stopPropagation()
        setIsEdit(false)
      }}>
      <div className='bg-white max-w-[1100px] overflow-auto' onClick={e => e.stopPropagation()}>
        <CreatePost isEdit={isEdit} />
      </div>
    </div>
  )
}

export default UpdatePost