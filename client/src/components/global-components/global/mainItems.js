import {AiOutlineHome} from 'react-icons/ai';
import { MdOutlineConnectWithoutContact } from "react-icons/md";
// import { AccountEnHead } from './AccountEnHead';
// import { AccountArHead } from './AccountArHead';
import { MdDiscount } from "react-icons/md";




const items = [
    {
        id: 1,
        title: "Home",
        title_ar: "الرائيسية",
        href: "/",
        icon: <AiOutlineHome className='icon' />,
    },
    {
        id: 2,
        title: "Latest Shows",
        title_ar: "أحدث العروض",
        href: "/shows",
        icon: <MdDiscount className='icon' />,
    },
    {
        id: 3,
        title: "Contact us",
        title_ar: "اتصل بنا",
        href: "/contact",
        icon: <MdOutlineConnectWithoutContact className='icon' />,
    },
]
export default items;

