import React from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import Card from "../../global-components/card/Card";
import "./ProductForm.scss";
import { useTranslation } from "react-i18next";

const ProductForm = ({
  product,
  imagePreview,
  imagePreviews,
  handleInputChange,
  handleImageChange,
  handleImagesChange,
  saveProduct,
}) => {
  // Translation
  const { t } = useTranslation();

  // New handler for ReactQuill
  const handleQuillChange = (value) => {
    handleInputChange({ target: { name: "description", value } });
  };

  return (
    <div className="add-product w-full">
      <Card cardClass={"card"}>
        <form onSubmit={saveProduct}>
          <input type="text" 
            name="hasShow" placeholder="are there any shows?" 
            value={product?.hasShow || ''} 
            onChange={handleInputChange} />
          <input type="text" 
            name="productType" placeholder="Product Type" 
            value={product?.productType || ''} 
            onChange={handleInputChange} />
          <Card cardClass={"group"}>
            <label>{t("dashboard.product.productImage")}</label>
            <code>{t("dashboard.product.supportedFormats")}</code>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
            />
            {imagePreview ? (
              <div className="image-preview">
                <img src={imagePreview} alt="product" />
              </div>
            ) : (
              <p>{t("noImg")}</p>
            )}
          </Card>

          <Card cardClass={"group"}>
            <label>{t("dashboard.product.productImages")}</label>
            <code>{t("dashboard.product.supportedFormats")}</code>
            <input
              type="file"
              name="productSlideImages"
              multiple
              onChange={handleImagesChange} // Ensure this is the correct handler
            />
            {imagePreviews.length > 0 ? (
              <div className="image-preview">
                {imagePreviews.map((preview, index) => (
                  <img key={index} src={preview} alt={`productImages-${index}`} />
                ))}
              </div>
            ) : (
              <p>{t("noImgs")}</p>
            )}
          </Card>

          <label>{t("dashboard.product.productName")}:</label>
          <input
            type="text"
            placeholder={t("dashboard.product.productName")}
            name="name"
            value={product?.name || ''}
            onChange={handleInputChange}
          />
          <label>{t("dashboard.product.productNameAr")}:</label>
          <input
            type="text"
            placeholder={t("dashboard.product.productNameAr")}
            name="name_ar"
            value={product?.name_ar || ''}
            onChange={handleInputChange}
          />
          <label>{t("dashboard.product.ProductCategory")}:</label>
          <input
            type="text"
            placeholder={t("dashboard.product.ProductCategory")}
            name="category"
            value={product?.category || ''}
            onChange={handleInputChange}
          />
          <label>{t("dashboard.product.ProductCategoryAr")}:</label>
          <input
            type="text"
            placeholder={t("dashboard.product.ProductCategoryAr")}
            name="category_ar"
            value={product?.category_ar || ''}
            onChange={handleInputChange}
          />
          <label>{t("dashboard.product.ProductColor")}:</label>
          <input
            type="text"
            placeholder={t("dashboard.product.ProductColor")}
            name="itemColor"
            value={product?.itemColor || ''}
            onChange={handleInputChange}
          />
          <label>{t("dashboard.product.ProductModel")}:</label>
          <input
            type="text"
            placeholder={t("dashboard.product.ProductModel")}
            name="model"
            value={product?.model || ''}
            onChange={handleInputChange}
          />
          <label>{t("dashboard.product.ProductModelAr")}:</label>
          <input
            type="text"
            placeholder={t("dashboard.product.ProductModelAr")}
            name="model_ar"
            value={product?.model_ar || ''}
            onChange={handleInputChange}
          />
          <label>{t("dashboard.product.productPrice")}:</label>
          <input
            type="text"
            placeholder={t("dashboard.product.productPrice")}
            name="price"
            value={product?.price || ''}
            onChange={handleInputChange}
          />
          <label>{t("dashboard.product.ProductDescription")}:</label>
          <ReactQuill
            theme="snow"
            value={product.description || ''}
            onChange={handleQuillChange}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
            className="text-gray-500"
          />
          <label>{t("dashboard.product.ProductDescriptionAr")}:</label>
          <ReactQuill
            theme="snow"
            value={product.description_ar || ''}
            onChange={(value) => handleInputChange({ target: { name: "description_ar", value } })}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
            className="text-gray-500"
          />
          <div>
            <button type="submit" className="btn mt-3">
              {t("dashboard.product.saveProduct")}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};

ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;