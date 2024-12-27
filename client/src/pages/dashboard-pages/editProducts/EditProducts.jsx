import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import ProductForm from "../../../components/dashboard-components/productForm/ProductForm";
import {
  getProduct,
  getProducts,
  selectProduct,
  updateProduct,
  selectIsLoading,
} from "../../../redux/features/product/productSlice";
import Header from "../../../components/dashboard-components/Header";
import { useTranslation } from "react-i18next";
import Loader from "../../../components/global-components/Loader";

const EditProducts = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const productEdit = useSelector(selectProduct);
  const isLoading = useSelector(selectIsLoading);

  const [product, setProduct] = useState({
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
    image: null,
    productImages: [],
  });
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (productEdit) {
      setProduct({
        hasShow: productEdit.hasShow || "",
        productType: productEdit.productType || "",
        name: productEdit.name || "",
        name_ar: productEdit.name_ar || "",
        category: productEdit.category || "",
        category_ar: productEdit.category_ar || "",
        description: productEdit.description || "",
        description_ar: productEdit.description_ar || "",
        itemColor: productEdit.itemColor || "",
        model: productEdit.model || "",
        model_ar: productEdit.model_ar || "",
        price: productEdit.price || "",
        image: productEdit.image || null,
        productImages: productEdit.productImages || [],
      });
      setImagePreview(productEdit.image ? productEdit.image.filePath : null);
      setImagePreviews(productEdit.productImages.map(img => img.filePath) || []);
    }
  }, [productEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

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
      setProductImages(files);
      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    } else {
      console.error("No image files selected");
    }
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("hasShow", product.hasShow);
    formData.append("productType", product.productType);
    formData.append("name", product.name);
    formData.append("name_ar", product.name_ar);
    formData.append("category", product.category);
    formData.append("category_ar", product.category_ar);
    formData.append("description", product.description);
    formData.append("description_ar", product.description_ar);
    formData.append("itemColor", product.itemColor);
    formData.append("model", product.model);
    formData.append("model_ar", product.model_ar);
    formData.append("price", product.price);
    if (productImage) {
      formData.append("image", productImage);
    }

    // Append additional product images
    if (productImages.length > 0) {
      productImages.forEach((image) => {
        formData.append("productImages", image);
      });
    }

    try {
      await dispatch(updateProduct({ id, formData }));
      await dispatch(getProducts());
      navigate("/products-dashboard");
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => {
        URL.revokeObjectURL(preview);
      });
    };
  }, [imagePreviews]);

  return (
    <Box p="20px">
      {isLoading ? (
        <Loader />
      ) : (
        <Box id="editProduct">
          <Header title={t("dashboard.editProduct")} />
          <ProductForm
            product={product}
            productImage={productImage}
            imagePreview={imagePreview}
            productImages={productImages}
            imagePreviews={imagePreviews}
            handleInputChange={handleInputChange}
            handleImageChange={handleImageChange}
            handleImagesChange={handleImagesChange}
            saveProduct={saveProduct}
          />
        </Box>
      )}
    </Box>
  );
};

export default EditProducts;