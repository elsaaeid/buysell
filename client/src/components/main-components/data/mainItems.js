import mainSlide1 from "../../../assets/main-slide1.png";
import mainSlide2 from "../../../assets/main-slide2.png";
import mainSlide3 from "../../../assets/main-slide3.png";
import mainSlide4 from "../../../assets/main-slide4.png";

export const mainItems = [
    {
        id: 1,
        headTitle: "Discover the Latest Trends in Fashion",
        headTitle_ar: "اكتشف أحدث الاتجاهات في الموضة",
        image: <img src={mainSlide1} alt={mainSlide1} className="carousel-image" />,
    },
    {
        id: 2,
        headTitle: "Unbeatable Deals on Electronics",
        headTitle_ar: "عروض لا تقبل المنافسة على الإلكترونيات",
        image: <img src={mainSlide2} alt={mainSlide2} className="carousel-image" />,
    },
    {
        id: 3,
        headTitle: "Exclusive Offers Just for You",
        headTitle_ar: "عروض حصرية فقط لأجلك",
        image: <img src={mainSlide3} alt={mainSlide3} className="carousel-image" />,
    },
    {
        id: 4,
        headTitle: "Sign up now to explore Our Exclusive Collection Today!",
        headTitle_ar: "سجل الآن لاستكشاف مجموعتنا الحصرية اليوم!",
        image: <img src={mainSlide4} alt={mainSlide4} className="carousel-image" />,
    }
];