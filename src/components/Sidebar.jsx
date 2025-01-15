import { useContext } from "react";
import "../assets/scss/sidebar.scss";
import DataContext from "../context/DataContext";

const CategoryList = () => {
  const { handleSubmit, state, dispatch } = useContext(DataContext);
  const { categories } = state;

  return (
    <aside>
      <h2>Categories</h2>
      <ul>
        {categories?.map((category) => (
          <li key={category.id}>
            <a
              onClick={(e) => {
                e.preventDefault();
                dispatch({ type: "selectCategory", payload: category.id });
              }}
              href="#"
            >
              {category.name}
            </a>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <h3>{state.selectProduct ? "Edit Product" : "Add Product"}</h3>
          <label htmlFor="productName">Product Name</label>
          <input
            value={state.name}
            onChange={(e) =>
              dispatch({ type: "name", payload: e.target.value })
            }
            type="text"
            id="name"
            placeholder="Enter product name.."
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantityPerUnit">Quantity Per Unit</label>
          <input
            value={state.quantityPerUnit}
            onChange={(e) =>
              dispatch({ type: "quantityPerUnit", payload: e.target.value })
            }
            type="text"
            id="quantityPerUnit"
            placeholder="Enter quantity per unit.."
          />
        </div>
        <div className="form-group">
          <label htmlFor="unitPrice">Unit Price</label>
          <input
            value={state.unitPrice}
            onChange={(e) =>
              dispatch({ type: "unitPrice", payload: e.target.value })
            }
            type="number"
            id="unitPrice"
            placeholder="Enter unit price"
          />
        </div>
        <div className="form-group">
          <label htmlFor="unitsInStock">Units in Stock</label>
          <input
            value={state.unitsInStock}
            onChange={(e) =>
              dispatch({ type: "unitsInStock", payload: e.target.value })
            }
            type="number"
            id="unitsInStock"
            placeholder="Enter units in stock"
          />
        </div>
        <button
          disabled={
            state.name === "" ||
            state.quantityPerUnit === "" ||
            state.unitPrice === "" ||
            state.unitsInStock === ""
          }
          type="submit"
          className="add-button"
        >
          {state.selectProduct ? "Edit" : "Add"}
        </button>
      </form>
    </aside>
  );
  <Outlet />;
};

export default CategoryList;
