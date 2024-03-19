import { LuPencilLine } from 'react-icons/lu'
import { MdOutlineLibraryBooks } from 'react-icons/md'
import { AiOutlineUser } from 'react-icons/ai'

const menuSideBar = [
    {
        id: 1,
        text: 'Create rental post',
        path: '/system/create-new-post',
        icon: <LuPencilLine />
    },
    {
        id: 2,
        text: 'Manage rental post',
        path: '/system/manage-post',
        icon: <MdOutlineLibraryBooks />
    },
    {
        id: 3,
        text: 'Edit profile',
        path: '/system/profile',
        icon: <AiOutlineUser />
    },
    {
        id: 4,
        text: 'Contact',
        path: '/system/contact',
        icon: <AiOutlineUser />
    }
]

export default menuSideBar