import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/global-components/Loader";
import ProductForm from "../../../components/dashboard-components/productForm/ProductForm";
import {
  createProduct,
  selectIsLoading,
} from "../../../redux/features/product/productSlice";
import Header from "../../../components/dashboard-components/Header";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Context } from "../../../context/Context";

const initialState = {
  hasShow: "",
  productType: "",
  name: "",
  name_ar: "",
  category: "",
  category_ar: "",
  description: "",
  description_ar: "",
  itemColor: "",
  model: "",
  model_ar: "",
  price: "",
};

const AddProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const { productImage, setProductImage, imagePreview, setImagePreview, imagePreviews, setImagePreviews, productSlideImages, setProductSlideImages } = useContext(Context);

  const isLoading = useSelector(selectIsLoading);
  const { t } = useTranslation();
  const {
    hasShow,
    productType,
    name,
    name_ar,
    category,
    category_ar,
    description,
    description_ar,
    itemColor,
    model,
    model_ar,
    price,
  } = product;

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Allow commas in the price field
    const formattedValue = name === "price" ? value.replace(/[^0-9.,]/g, "") : value;

    setProduct((prevProduct) => ({ ...prevProduct, [name]: formattedValue }));
  };

  // Handle single image upload (main image)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      console.error("No image file selected");
    }
  };

  // Handle multiple image uploads (additional product images)
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setProductSlideImages(files);
      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    } else {
      console.error("No image files selected");
    }
  };

  // Generate SKU based on category
  const generateSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    return `${letter}-${number}`;
  };

  // Save product to the backend
  const saveProduct = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append("hasShow", hasShow);
    formData.append("productType", productType);
    formData.append("name", name);
    formData.append("name_ar", name_ar);
    const skus = [generateSKU(category), generateSKU(category_ar)];
    formData.append("sku", JSON.stringify(skus));
    formData.append("category", category);
    formData.append("category_ar", category_ar);
    formData.append("description", description);
    formData.append("description_ar", description_ar);
    formData.append("itemColor", itemColor);
    formData.append("model", model);
    formData.append("model_ar", model_ar);
    formData.append("price", price);

    // Append main image
    if (productImage) {
      formData.append("image", productImage);
    }

    // Append additional product images
    if (productSlideImages.length > 0) {
      productSlideImages.forEach((image) => {
        formData.append("productSlideImages", image);
      });
    }

    try {
      // Dispatch the createProduct action
      await dispatch(createProduct(formData));
      navigate("/products-dashboard");
      // reset form
      setProductImage(null);
      setImagePreview(null);
      setImagePreviews([]);
      setProductSlideImages([]);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <Box p="20px">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header title={t("dashboard.addProduct")} />
          <ProductForm
            product={product}
            imagePreview={imagePreview}
            imagePreviews={imagePreviews}
            handleInputChange={handleInputChange}
            handleImageChange={handleImageChange}
            handleImagesChange={handleImagesChange}
            saveProduct={saveProduct}
          />
        </>
      )}
    </Box>
  );
};

export default AddProducts;