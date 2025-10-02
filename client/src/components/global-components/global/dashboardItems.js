import { BiSolidDashboard } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { RiFunctionAddFill } from 'react-icons/ri';


const items = [
    {
        id: 1,
        title: "Dashboard",
        title_ar: "لوحة التحكم",
        href: "/products-dashboard",
        icon: <BiSolidDashboard className='icon' />,
    },
    {
        id: 2,
        title: "Add Products",
        title_ar: "أضف منتجات",
        href: "/add-products",
        icon: <RiFunctionAddFill className='icon' />,
    },
    {
        id: 14,
        title: "users",
        title_ar: "المستخدمين",
        href: "/users",
        icon: <FaUsers className='icon' />,
    },
]
export default items;