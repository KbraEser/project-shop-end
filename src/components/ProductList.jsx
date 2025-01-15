import React, { useContext } from "react";
import Product from "./Product";
import "../assets/scss/ProductList.scss";
import DataContext from "../context/DataContext";

const ProductList = () => {
  const { state } = useContext(DataContext);

  return (
    <div className="products-list">
      {state.products.map(
        (item) =>
          !item.isDeleted && (
            <div key={item.id}>
              <Product item={item} />
            </div>
          )
      )}
    </div>
  );
};

export default ProductList;
