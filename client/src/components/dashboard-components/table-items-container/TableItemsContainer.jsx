import * as React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import "./__table.scss";
import { Context } from '../../../context/Context';


const columns = [
  { id: 'id', label: 'Id' },
  { id: 'hasShow', label: 'hasShow' },
  { id: 'productType', label: 'Product Type' },
  { id: 'name', label: 'Name' },
  {
    id: 'color',
    label: 'Color',
  },
  {
    id: 'model',
    label: 'Model',
  },
  {
    id: 'preview',
    label: 'Preview',
  },
  {
    id: 'previews',
    label: 'Previews',
  },
  {
    id: 'category',
    label: 'Category',
  },
  { id: 'price', label: 'Price' },
  {
    id: 'description',
    label: 'Description',
  },
  {
    id: 'action',
    label: 'Action',
  },
];


export default function TableItemsContainer({products, pageCount, handlePageClick, currentItems, confirmDelete}) {
  
  // Translation
  const { t, i18n, shortenText } = React.useContext(Context);
  const translatedCurrentItems = (currentItems || []).map(product => {
    if (i18n.language === 'ar') {
        return {
            _id: product._id,
            hasShow: product.hasShow,
            productType: product.productType,
            name: product.name_ar,
            image: product.image,
            productSlideImages: product.productSlideImages,
            category: product.category_ar,
            price: product.price,
            description: product.description_ar,
            model: product.model_ar,
            itemColor: product.itemColor,
        };
    }
    return product;
});

console.log("Current Items:", currentItems);
console.log("Translated Current Items:", translatedCurrentItems);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <div 
        className="table w-full">
        {products.length === 0 ? (
          <p>-- {t("dashboard.productList.NoProductFound")}...</p>
        ) : (
          <table className='w-full overflow-x-scroll'>
            <thead>
              <tr>
              {columns.map((column) => (
                <th
                  key={column.id}
                >
                  {column.label}
                </th>
              ))}
              </tr>
            </thead>

            <tbody>
              {translatedCurrentItems.map((product, index) => {
                const { _id, hasShow, productType, name, itemColor, model, image, productSlideImages, category, price, description } = product;
                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{hasShow ? "yes" : "no"}</td>
                    <td>{productType}</td>
                    <td>{name}</td>
                    <td>
                      <span 
                          style={{
                              display: "block",
                              background: itemColor,
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                          }}
                      ></span>
                    </td>
                    <td>{model}</td>
                    <td>
                      {image ? (
                        <img
                          src={image.filePath}
                          alt={image.fileName}
                        />
                      ) : (
                        null
                      )}
                    </td>
                    <td>
                      {productSlideImages && productSlideImages.length > 0 ? (
                        <div className="image-previews">
                          {productSlideImages.map((image, index) => (
                            <img
                              key={index}
                              src={image.filePath}
                              alt={image.fileName}
                              style={{ width: '50px', height: '50px', margin: '0 5px' }}
                            />
                          ))}
                        </div>
                      ) : (
                        <p>No additional images</p>
                      )}
                    </td>
                    <td>{category}</td>
                    <td align="right">
                      <span>
                        {price ? `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}$` : null}
                      </span>
                    </td>
                    <td align="right">
                      <div dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(shortenText(description, 100)),
                      }}
                      ></div>
                    </td>
                    <td className="icons">
                      <span>
                        <Link to={`/edit-products/${_id}`}>
                          <FaEdit size={20} color={"green"} />
                        </Link>
                      </span>
                      <span>
                        <FaTrashAlt
                          size={20}
                          color={"red"}
                          onClick={() => confirmDelete(_id)}
                        />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        </div>
        <ReactPaginate
          className="pagination flex flex-row justify-around items-center"
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </TableContainer>
    </Paper>
  );
}