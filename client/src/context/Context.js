import React, { createContext, useState, useLayoutEffect, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/auth/authSlice";
import { useTheme } from '@mui/material';
import { tokens } from "../theme";

// Create a context
export const Context = createContext();

// ThemeProvider component to manage the theme state
export const ContextProvider = ({ children }) => {
    // User Select
    const user = useSelector(selectUser);
    
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
    //getProducts
    const { products } = useSelector(
      (state) => state.product
      );

    // State management
    const { i18n, t } = useTranslation();
    const [btnState, setBtnState] = useState("/");
    const [orderState, setOrderState] = useState("");
    const [joinState, setJoinState] = useState(true);
    const [profile, setProfile] = useState(initialState);
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [backToTop, setBackToTop] = useState(false);
    const [categoryState, setCategoryState] = useState(i18n.language === 'en' ? "All" : "كل");
    const [orderTabState, setOrderTabState] = useState(i18n.language === 'en' ? "All" : "كل");
    const [currentItems, setCurrentItems] = useState([]);
    const [numState, setNumState] = useState(products?.length);
    // cart states
    const [isInCart, setIsInCart] = useState(true);
    const [showCart, setShowCart] = useState(false);
    // show account menu
    const [showMenu, setShowMenu] = useState(false);
    // show payment menu
    const [showPaymentMenu, setShowPaymentMenu] = useState(false);

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
        setOrderState(order);
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

  // Auth State select
  const { isLoggedIn, isSuccess } = useSelector((state) => state.auth);

  // Join title changing on Condition
  useEffect(() => {
      setJoinState(!(isSuccess && isLoggedIn));
  }, [isLoggedIn, isSuccess]);

  useEffect(() => {
    const translatedCategory = i18n.language === 'en' ? categoryState : items.find(item => item.category === categoryState)?.category_ar;
    setCategoryState(translatedCategory);
  }, [i18n.language]);

  //Dropdown
   const toggleItemTab = (category, category_ar, num, order, filterTap) => {
    // Dynamically set categoryState based on the current language
    const translatedCategory = i18n.language === 'en' ? category : category_ar;
    setCategoryState(translatedCategory); // Set the translated category
    setNumState(num);
    setOrderTabState(order);
    setCurrentItems(filterTap);
  };
  
   //Dropdown
   const toggleColor = (category, num, order, filterTap) => {
    setCategoryState(category);
    setNumState(num);
    setOrderTabState(order);
    setCurrentItems(filterTap);
  };
  
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

    return (
        <Context.Provider 
            value={{
                backToTop,
                btnState, 
                setBtnState,
                btnHandling, 
                orderState,
                toggleTab, 
                joinState,
                setJoinState, 
                profile, 
                setProfile, 
                profileImage, 
                setProfileImage, 
                imagePreview, 
                setImagePreview,
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
                toggleColor,
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
            }}
        >
            {children}
        </Context.Provider>
    );
};