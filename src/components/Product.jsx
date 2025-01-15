import React, { useContext } from "react";
import "../assets/scss/product.scss";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import DataContext from "../context/DataContext";
import { Link } from "react-router-dom";

const Product = ({ item }) => {
  const { removeProduct, editCard, state } = useContext(DataContext);

  return (
    <>
      {(item.name.toLowerCase().startsWith(state.search.toLowerCase()) ||
        item.unitPrice.toString().startsWith(state.search)) && (
        <div className="product">
          <Link to={`/product/${item.id}`} className="product-link">
            <img
              src="https://cdn.pixabay.com/photo/2017/11/25/17/17/sandwich-2977251_1280.jpg"
              alt=""
            />

            <div className="product-inline">
              <p>{item.name}</p>
              <p>Birim: {item.quantityPerUnit}</p>
              <p>Fiyat: {item.unitPrice}</p>
              <p>Stok: {item.unitsInStock}</p>
            </div>
          </Link>

          <div className="button-container">
            <button onClick={() => editCard(item.id)}>
              <FaRegEdit />
            </button>
            <button onClick={() => removeProduct(item.id)}>
              <FaRegTrashCan />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
