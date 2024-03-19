import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import moment from 'moment'
import { Button, UpdatePost } from '../../components'
import { apiDeletePost } from '../../services'
import Swal from 'sweetalert2'


const ManagePost = () => {
	const dispatch = useDispatch()
	const [isEdit, setIsEdit] = useState(false)
	const { userPosts, dataEdit } = useSelector(state => state.post)
	const [updateData, setUpdateData] = useState(false)
	const [filteredPosts, setFilteredPosts] = useState([])
	console.log(dataEdit.length);
	useEffect(() => {
		dispatch(actions.getAdminLimitPosts())
	}, [dataEdit, updateData])

	useEffect(() => {
		!dataEdit && setIsEdit(false)
	}, [dataEdit])

	useEffect(() => {
		setFilteredPosts(userPosts)
	}, [userPosts])

	const checkStatus = (dateString) => {
		return moment(dateString, process.env.REACT_APP_FORMAT_DATE).isAfter(new Date().toDateString())
	}

	const handleDeletePost = async (postId) => {
		const response = await apiDeletePost(postId)
		if (response?.data.err === 0) {
			setUpdateData(prev => !prev)
		}
		else {
			Swal.fire('Oops!', "Delete post failed", 'error')
		}
	}

	const handleFilterByStatus = (status) => {
		if (status === 'active') {
			const activePost = userPosts.filter(item => checkStatus(item?.overview?.expired?.split(' ')[3]))
			setFilteredPosts(activePost)
		}
		else if (status === 'inactive') {
			const inactivePost = userPosts.filter(item => !checkStatus(item?.overview?.expired?.split(' ')[3]))
			setFilteredPosts(inactivePost)
		}
		else {
			setFilteredPosts(userPosts)
		}
	}

	return (
		<div className='flex flex-col gap-6'>
			<div className='py-4 border-b border-gray-200 flex items-center justify-between'>
				<h1 className='text-3xl font-medium'>Post Management</h1>
				<select onChange={e => handleFilterByStatus(e.target.value)} className='outline-none border p-2 border-gray-100 rounded-md' id="">
					<option value="">Filter By Status</option>
					<option value="active">Active</option>
					<option value="inactive">Inactive</option>
				</select>
			</div>
			<table className="w-full table-auto">
				<thead>
					<tr className='flex w-full bg-gray-100'>
						<th className='border flex-1 p-2'>Id</th>
						<th className='border flex-1 p-2'>Avatar</th>
						<th className='border flex-1 p-2'>Subject</th>
						<th className='border flex-1 p-2'>Price</th>
						<th className='border flex-1 p-2'>Start Date</th>
						<th className='border flex-1 p-2'>Expire Date</th>
						<th className='border flex-1 p-2'>Status</th>
						<th className='border flex-1 p-2'>Options</th>
					</tr>
				</thead>
				<tbody>
					{filteredPosts
						?
						filteredPosts?.map(item => {
							return (
								<tr className='flex h-16 items-center' key={item.id}>
									<td className='border px-2 flex-1 h-full flex justify-center items-center'>{item?.overview?.code}</td>
									<td className='border px-2 flex-1 h-full flex items-center justify-center p-2'>
										<img src={JSON.parse(item?.images?.image)[0] || ''} alt='post' className='w-10 h-10 object-cover rounded-md' />
									</td>
									<td className='border px-2 flex-1 h-full flex justify-center items-center'>{`${item?.title?.slice(0, 20)}...`}</td>
									<td className='border px-2 flex-1 h-full flex justify-center items-center'>{item?.attribute?.price}</td>
									<td className='border px-2 flex-1 h-full flex justify-center items-center'>{item?.overview?.created}</td>
									<td className='border px-2 flex-1 h-full flex justify-center items-center'>{item?.overview?.expired}</td>
									<td className='border px-2 flex-1 h-full flex justify-center items-center'>{checkStatus(item?.overview?.expired?.split(' ')[3]) ? 'Active' : 'Expired'}</td>
									<td className='border px-2 flex-1 h-full flex justify-center items-center gap-4'>
										<Button
											text='Edit'
											bgColor='bg-green-500'
											textColor={'text-white'}
											onClick={() => {
												setIsEdit(true)
												dispatch(actions.editPost(item))
											}}
										/>
										<Button
											text='Delete'
											bgColor='bg-red-500'
											textColor={'text-white'}
											onClick={() => handleDeletePost(item.id)}
										/>
									</td>
								</tr>
							)
						})
						:
						<tr>
							<td>You don't have any posts</td>
						</tr>
					}
				</tbody>
			</table>
			{isEdit && <UpdatePost isEdit={isEdit} setIsEdit={setIsEdit} dataEdit={dataEdit} />}

		</div>
	)
}

export default ManagePost