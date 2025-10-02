import React, { createContext, useState, useLayoutEffect, useEffect, useCallback } from 'react';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/features/auth/authSlice";
import { useTheme } from '@mui/material';
import { tokens } from "../theme";
import { getProducts } from '../redux/features/product/productSlice';

// Create a context
export const Context = createContext();

// ThemeProvider component to manage the theme state
export const ContextProvider = ({ children }) => {
    // User Select
    const user = useSelector(selectUser);
    // Dispatch
    const dispatch = useDispatch();
    
    // Initial State
    const initialState = {
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        bio: user?.bio || "",
        photo: user?.photo || "",
        role: user?.role || "",
        isVerified: user?.isVerified || false,
    };

    // Theme Colors Mode
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // State management
    const { i18n, t } = useTranslation();
    const [btnState, setBtnState] = useState("/");
    const [joinState, setJoinState] = useState(true);
    const [profile, setProfile] = useState(initialState);
    const [profileImage, setProfileImage] = useState(null);
    const [backToTop, setBackToTop] = useState(false);
    // Category State
    const [categoryState, setCategoryState] = useState("");
    const [orderTabState, setOrderTabState] = useState(() => t("all"));
    const [currentItems, setCurrentItems] = useState([]);
    const [numState, setNumState] = useState(0);
    const [productsItems, setProductsItems] = useState([]);
    // cart states
    const [isInCart, setIsInCart] = useState(true);
    const [showCart, setShowCart] = useState(false);
    // show account menu
    const [showMenu, setShowMenu] = useState(false);
    // show payment menu
    const [showPaymentMenu, setShowPaymentMenu] = useState(false);
    const [productImage, setProductImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [productSlideImages, setProductSlideImages] = useState([]);


    // open and rotate dropdown of category items
    const [open, setOpen] = useState(true);
    const [rotate, setRotate] = useState(false);

    // open and rotate dropdown of color items
    const [openColor, setOpenColor] = useState(true);
    const [rotateColor, setRotateColor] = useState(false);

    // open and rotate dropdown of model items
    const [openModel, setOpenModel] = useState(true);
    const [rotateModel, setRotateModel] = useState(false);

    // cart quantity state
    const [quantity, setQuantity] = useState(1);

    // Scroll Handling Side Effect
    useEffect(() => {
        const handleScroll = () => {
            setBackToTop(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
    }, []);

    // Button Handling Function
    const btnHandling = (state) => {
        setBtnState(state);
    };

    // Toggle Tab Function
    const toggleTab = (order) => {
        setOrderTabState(order);
    };

    useLayoutEffect(() => {
        if (user) {
            setProfile({
                ...profile,
                name: user.name,
                email: user.email,
                phone: user.phone,
                photo: user.photo,
                bio: user.bio,
                role: user.role,
                isVerified: user.isVerified,
            });
        }
    }, [user]);


  //getProducts
  const { products } = useSelector(
  (state) => state.product
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products) {
      setProductsItems(products);
    }
  }, [products]);

  useEffect(() => {
    if (productsItems) {
      setNumState(productsItems.length);
    }
  }, [productsItems]);

  // Auth State select
  const { isLoggedIn, isSuccess } = useSelector((state) => state.auth);

  // Join title changing on Condition
  useEffect(() => {
      setJoinState(!(isSuccess && isLoggedIn));
  }, [isLoggedIn, isSuccess]);


  //Dropdown
   const toggleItemTab = (category, category_ar, num, order, filterTap) => {
    // Dynamically set categoryState based on the current language
    const translatedCategory = i18n.language === 'en' ? category : category_ar;
    setCategoryState(translatedCategory); // Set the translated category
    setNumState(num);
    setOrderTabState(order);
    setCurrentItems(filterTap);
  };

  // Logic for toggling "All" category
  const toggleTabForAll = useCallback(
    (category, num, order, filterTap) => {
      setCategoryState(category); // Set category to "All" or "كل"
      setNumState(num);
      setOrderTabState(order);
      setCurrentItems(filterTap);
    },
    [setCategoryState, setNumState, setOrderTabState, setCurrentItems] // Added dependencies
  );
  
  // show category items
  const showMore = () => {
    setOpen(!open);
    setRotate(!rotate);
  };

  // hide category items
  const hideMore = () => {
    setOpen(true); // Set open to false to hide the dropdown
    setRotate(false); // Reset rotation
  };

  // show color items
  const showColorMore = () => {
    setOpenColor(!openColor);
    setRotateColor(!rotateColor);
  };

  // hide color items
  const hideColorMore = () => {
    setOpenColor(true); // Set open to false to hide the dropdown
    setRotateColor(false); // Reset rotation
  };

  // show model items
  const showModelMore = () => {
      setOpenModel(!openModel);
      setRotateModel(!rotateModel);
    };
  
    // hide color items
    const hideModelMore = () => {
      setOpenModel(true); // Set open to false to hide the dropdown
      setRotateModel(false); // Reset rotation
    };

    // Function to shorten text
    const shortenText = useCallback((text, n) => {
      if (text.length > n) {
        return text.substring(0, n).concat("...");
      }
      return text;
    }, []);
    

    return (
        <Context.Provider 
            value={{
                products,
                backToTop,
                btnState, 
                setBtnState,
                btnHandling, 
                toggleTab, 
                joinState,
                setJoinState, 
                profile, 
                setProfile, 
                profileImage, 
                setProfileImage, 
                imagePreview, 
                setImagePreview,
                productSlideImages,
                setProductSlideImages,
                productImage,
                setProductImage,
                imagePreviews,
                setImagePreviews,
                i18n,
                t,
                colors,
                showCart,
                setShowCart,
                quantity,
                setQuantity,
                isInCart,
                setIsInCart,
                toggleItemTab,
                categoryState,
                orderTabState,
                currentItems,
                setCurrentItems,
                numState,
                showMore,
                hideMore,
                open,
                rotate,
                showColorMore,
                hideColorMore,
                openColor,
                rotateColor,
                showModelMore,
                hideModelMore,
                openModel,
                rotateModel,
                showMenu,
                setShowMenu,
                showPaymentMenu,
                setShowPaymentMenu,
                toggleTabForAll,
                shortenText,
            }}
        >
            {children}
        </Context.Provider>
    );
};