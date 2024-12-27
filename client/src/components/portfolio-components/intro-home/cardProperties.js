import Lottie from 'react-lottie';
import animationCamera from '../../../lotties/DesignCamera';
import animationSeo from '../../../lotties/DesignSeo';
import animationWeb from '../../../lotties/DesignWeb';
import animationGraphic from '../../../lotties/DesignGraphic';
import animationContent from '../../../lotties/DesignContent';
import animationSponsor from '../../../lotties/DesignSponsor';






const DesignWeb = {
  loop: true,
  autoplay: true,
  animationData: animationWeb,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};
const DesignCamera = {
loop: true,
autoplay: true,
animationData: animationCamera,
rendererSettings: {
  preserveAspectRatio: "xMidYMid slice"
}
};
const DesignSeo = {
loop: true,
autoplay: true,
animationData: animationSeo,
rendererSettings: {
  preserveAspectRatio: "xMidYMid slice"
}
};
const DesignGraphic = {
loop: true,
autoplay: true,
animationData: animationGraphic,
rendererSettings: {
  preserveAspectRatio: "xMidYMid slice"
}
};
const DesignContent = {
loop: true,
autoplay: true,
animationData: animationContent,
rendererSettings: {
  preserveAspectRatio: "xMidYMid slice"
}
};
const DesignSponsor = {
loop: true,
autoplay: true,
animationData: animationSponsor,
rendererSettings: {
  preserveAspectRatio: "xMidYMid slice"
}
};
 
const items = [
{
    id: "SoftwareEngineering",
    "name": "Software engineering",
    "name_ar": "هندسة البرمجيات",
    "paragraph": "consider your website design is what your business represents, so it should represent your online identity and play a role in how people perceive your brand. ",
    "paragraph_ar": " ​​يعد تصميم موقع الويب الخاص بك هو ما يمثله عملك، لذلك يجب أن يمثل هويتك عبر الإنترنت ويلعب دورًا في كيفية إدراك الأشخاص لعلامتك التجارية.",
    design: <Lottie 
    options={DesignWeb}
    className="lottie"
    />,
    "reviewService": "More",
    "reMaintenanceService": "Maintenance",
    "reviewService_ar": "المزيد",
    "reMaintenanceService_ar": "صيانة",
 },
  {
    id: "SEOOptimization",
    "name": "SEO optimization",
    "name_ar": "تحسين نتائج البحث",
    "paragraph": "I develop a comprehensive SEO strategy tailored to your business goals and target audience.",
    "paragraph_ar": "بقوم ​​بتطوير إستراتيجية شاملة لتحسين محركات البحث مصممة خصيصًا لأهداف عملك والجمهور المستهدف.",
    design: <Lottie
      options={DesignSeo}
      className="lottie"
    />,
      "reviewService": "More",
      "reMaintenanceService": "Maintenance",
    "reviewService_ar": "المزيد",
    "reMaintenanceService_ar": "صيانة",
  },
  {
    id: "productsPhotography",
    "name": "products photography",
    "name_ar": "تصوير المنتجات",
    "paragraph": "I depict high-quality products as a window into your store, improving speed, trust, quality and value. When customers see clear, attractive images of your products, they're more likely to trust your brand and make a purchase. ",
    "paragraph_ar": "بعمل على تصوير المنتجات عالية الجودة كنافذة على متجرك، مما يؤدي إلى تحسين السرعة والثقة والجودة والقيمة. عندما يرى العملاء صورًا واضحة وجذابة لمنتجاتك، فمن المرجح أن يثقوا بعلامتك التجارية ويقوموا بالشراء.",
    design: <Lottie 
    options={DesignCamera}
    className="lottie"
  />,
      "reviewService": "More",
      "reMaintenanceService": "Maintenance",
  "reviewService_ar": "المزيد",
  "reMaintenanceService_ar": "صيانة",
},
  {
    id: "graphicDesigning",
    "name": "graphic designing",
    "name_ar": "تصميم الجرافيك",
    "paragraph": "I create unique and visually attractive designs by creating and expressing your ideas and imagination.",
    "paragraph_ar": "بقوم بتصميمات فريدة وجذابة بصريًا عن طريق الابداع و التعبير عن أفكارك وخيالك.",
      design: <Lottie 
      options={DesignGraphic}
      className="lottie"
    />,
      "reviewService": "More",
      "reMaintenanceService": "Maintenance",
    "reviewService_ar": "المزيد",
    "reMaintenanceService_ar": "صيانة",

    },
  {
    id: "contentCreating",
    "name": "content creating",
    "name_ar": "صناعة المحتوة",
    "paragraph": "I produces various forms of media, such as written articles, videos, infographics, social media posts, and more, and plans, creates, and distributes content that resonates with the audience and supports business goals.",
    "paragraph_ar": "بقوم بإنتاج أشكال مختلفة من الوسائط، مثل المقالات المكتوبة ومقاطع الفيديو والرسوم البيانية ومنشورات وسائل التواصل الاجتماعي والمزيد و تخطيط وإنشاء وتوزيع المحتوى الذي يلقى صدى لدى الجمهور ويدعم أهداف العمل.",
    design: <Lottie 
      options={DesignContent}
      className="lottie"
    />,
      "reviewService": "More",
      "reMaintenanceService": "Maintenance",
    "reviewService_ar": "المزيد",
    "reMaintenanceService_ar": "صيانة",
  },
  {
    id: "SponsoredAds",
    "name": "Sponsored ads",
    "name_ar": "الاعلانات الممولة",
    "paragraph": "I determines the specific goals and target audience of each company and the effectiveness and relevance of sponsored advertising to its marketing strategies.",
    "paragraph_ar": "بقوم بتحديد الأهداف المحددة والجمهور المستهدف لكل شركة مدى فعالية وملاءمة الإعلانات الراعية لاستراتيجياتها التسويقية.",
      design: <Lottie 
      options={DesignSponsor}
      className="lottie"
    />,
      "reviewService": "More",
      "reMaintenanceService": "Maintenance",
    "reviewService_ar": "المزيد",
    "reMaintenanceService_ar": "صيانة",
  },
]
export default items