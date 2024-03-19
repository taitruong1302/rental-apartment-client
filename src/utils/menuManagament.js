import { LuPencilLine } from 'react-icons/lu'
import { MdOutlineLibraryBooks } from 'react-icons/md'
import { AiOutlineUser } from 'react-icons/ai'

const menuManage = [
    {
        id: 1,
        text: 'New rental Post',
        path: '/system/create-new-post',
        icon: <LuPencilLine />
    },
    {
        id: 2,
        text: 'Manage rental Post',
        path: '/system/manage-post',
        icon: <MdOutlineLibraryBooks />
    },
    {
        id: 3,
        text: 'Account information',
        path: '/system/profile',
        icon: <AiOutlineUser />
    },
]

export default menuManage