import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import DataContext from "../../context/DataContext";
import "../../assets/scss/productDetay.scss";

const ProductDetay = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { state, removeProduct, editCard } = useContext(DataContext);
  const parametre = params.productId;

  return (
    <div className="product-detail">
      <img
        src="https://cdn.pixabay.com/photo/2017/11/25/17/17/sandwich-2977251_1280.jpg"
        alt=""
      />

      <div className="product-inline">
        <p>{state.products[parametre - 1].name}</p>
        <p>Birim: {state.products[parametre - 1].quantityPerUnit}</p>
        <p>Fiyat: {state.products[parametre - 1].unitPrice}</p>
        <p>Stok: {state.products[parametre - 1].unitsInStock}</p>
      </div>

      <div className="button-container">
        <button onClick={() => editCard(state.products[parametre - 1].id)}>
          <FaRegEdit />
        </button>
        <button onClick={() => removeProduct(state.products[parametre - 1].id)}>
          <FaRegTrashCan />
        </button>
      </div>
    </div>
  );
};

export default ProductDetay;
