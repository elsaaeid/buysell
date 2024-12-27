import { BiSolidDashboard } from "react-icons/bi";
import { LiaBlogSolid } from "react-icons/lia";
import { FaUsers } from "react-icons/fa";




const items = [
    {
        id: 1,
        title: "Products Dashboard",
        title_ar: "لوحة المنتجات",
        href: "/products-dashboard",
        icon: <BiSolidDashboard className='icon' />,
    },
    {
        id: 2,
        title: "Add Products",
        title_ar: "أضف منتجات",
        href: "/add-products",
        icon: <BiSolidDashboard className='icon' />,
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