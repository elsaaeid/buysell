import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";
import "./SliderItems.css"; // Ensure this is imported
import { getCertificates } from "../../../../redux/features/certificate/certificateSlice";
import WOW from 'wowjs';
import Spinner from "../../../global-components/Spinner";


const SliderItems = () => {
  const wowRef = React.useRef(null); // Create a ref for WOW.js

  const dispatch = useDispatch();
  const { certificates } = useSelector((state) => state.certificate);
  
  // State for zoomed image
  const [zoomedImage, setZoomedImage] = useState(null);

  useEffect(() => {
    dispatch(getCertificates());
  }, [dispatch]);

  // Function to shorten text
  const shortenText = (text, n) => {
    return text.length > n ? text.substring(0, n) + "..." : text;
  };

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Function to handle image click
  const handleImageClick = (image) => {
    setZoomedImage(image);
  };

  // Function to close zoomed image
  const closeZoomedImage = () => {
    setZoomedImage(null);
  };
  // Initialize WOW.js
  useEffect(() => {
    if (typeof MutationObserver !== 'undefined') {
        wowRef.current = new WOW.WOW();
        wowRef.current.init(); // Initialize WOW.js
    } else {
        console.warn('MutationObserver is not supported in this browser.');
    }
 }, []);
  return (
    <Box className="w-full HomeSlider wow fadeInUp mb-3">
      {certificates.length === 0 ? (
        <Box className="w-full flex flex-center justify-center">
          <Spinner />
        </Box>
        ) : 
        (
      <Slider {...settings}>
        {certificates.map((certificate) => (
          <Box key={certificate._id}>
            <Box className="my-2 mx-2 flex flex-col justify-center items-center">
              <img
                src={certificate.image.filePath}
                alt={certificate.image.fileName}
                style={{ width: "100%", height: "auto", cursor: "pointer" }} // Optional styling
                onClick={() => handleImageClick(certificate.image.filePath)}
              />
              <h6>{shortenText(certificate.name, 16)}</h6>
            </Box>
          </Box>
        ))}
      </Slider>
        )
        }
      {/* Zoomed Image Modal */}
      {zoomedImage && (
        <Box 
          className="zoomed-image-modal" 
          onClick={closeZoomedImage} 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <img
            src={zoomedImage}
            alt="Zoomed"
            style={{ width: "80%", height: "auto", cursor: "pointer" }}
            onClick={closeZoomedImage} // Close on image click
          />
          <button 
            style={{
              color: "var(--color-primary)",
              border: "1px solid var(--color-primary)",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              position: "fixed", top: "20px", right: "20px", zIndex: 1001
            }}
            onClick={closeZoomedImage} 
            >
            X
          </button>
        </Box>
      )}
    </Box>
  );
};

export default SliderItems;