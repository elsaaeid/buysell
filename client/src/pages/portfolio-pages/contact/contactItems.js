import {MdOutlineEmail} from 'react-icons/md';
import {RiMessengerLine} from 'react-icons/ri';
import {BsWhatsapp} from 'react-icons/bs';

const contactItens = [
    {
        id: 1,
        icon: <MdOutlineEmail className="contact__option-icon" />,
        title: "Email",
        title_ar: "الايميل",
        subTitle: "saidsadaoy@gmail.com",
        contact_option: "mailto:saidsadaoy@gmail.com",
    },
    {
        id: 2,
        icon: <RiMessengerLine className="contact__option-icon" />,
        title: "Massenger",
        title_ar: "ماسنجر",
        contact_option: "https://m.me/average.solution",
    },
    {
        id: 3,
        icon: <BsWhatsapp className="contact__option-icon" />,
        title: "whatsApp",
        title_ar: "واتساب",
        subTitle: "+20 01028496209",
        contact_option: "https://wa.me/+0201028496209",
    }
]
export default contactItens;