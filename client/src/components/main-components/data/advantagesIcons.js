import { FcMultipleSmartphones } from "react-icons/fc";
import { FcShipped } from "react-icons/fc";
import { FcExternal } from "react-icons/fc";
import { FcReadingEbook } from "react-icons/fc";
import { FcAssistant } from "react-icons/fc";



export const advantagesIcons = [
    {
        id: 1,
        title: "Wide Selection of Products",
        title_ar: "تشكيلة واسعة من المنتجات",
        icon: <FcMultipleSmartphones fontSize="25" />,
        backgroundColor: "#a6a9ba",
    },
    {
        id: 2,
        title: "Competitive Pricing",
        title_ar: "أسعار تنافسية",
        icon: <FcExternal fontSize="25" />,
        backgroundColor: "#fcf0bc",
    },
    {
        id: 3,
        title: "User-Friendly Experience",
        title_ar: "تجربة سهلة الاستخدام",
        icon: <FcReadingEbook fontSize="25" />,
        backgroundColor: "#afd6e6",
    },
    {
        id: 4,
        title: "Fast and Reliable Shipping",
        title_ar: "شحن سريع وموثوق",
        icon: <FcShipped fontSize="25" />,
        backgroundColor: "rgb(255 117 107)",
    },
    {
        id: 5,
        title: "Excellent Customer Service",
        title_ar: "خدمة عملاء ممتازة",
        icon: <FcAssistant fontSize="25" />,
        backgroundColor: "#e89091",
    },
];