// reducer ile state işlemleri yapılır. Usestatın bır alternatıfıdır

export const initialState = {
  store: [],
  categories: [],
  products: [],
  selectCategory: "",
  selectProduct: "",
  name: "",
  quantityPerUnit: "",
  unitPrice: "",
  unitsInStock: "",
  search: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    // case-1
    case "bringCategory":
      return { ...state, categories: action.payload };
    // case-2
    case "bringProduct":
      return { ...state, products: action.payload };
    // case-3
    case "formReset":
      return {
        ...state,
        name: "",
        quantityPerUnit: "",
        unitPrice: "",
        unitsInStock: "",
      };
    // case-4 formdan gelenler
    case "name":
      return { ...state, name: action.payload };
    // case-5
    case "quantityPerUnit":
      return { ...state, quantityPerUnit: action.payload };
    // case-6
    case "unitPrice":
      return { ...state, unitPrice: action.payload };
    // case-7 formdan gelenler
    case "unitsInStock":
      return { ...state, unitsInStock: action.payload };
    // case-8
    case "selectCategory":
      return { ...state, selectCategory: action.payload };
    // case-9
    case "search":
      return { ...state, search: action.payload };
    // case-10
    case "addProduct":
      return { ...state, products: [...state.products, action.payload] };
    // case-11
    case "removeProduct":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    // case-12
    case "editCards":
      const incomingProduct = action.payload;
      return {
        ...state,
        name: incomingProduct.name,
        quantityPerUnit: incomingProduct.quantityPerUnit,
        unitPrice: incomingProduct.unitPrice,
        unitsInStock: incomingProduct.unitsInStock,
      };
    // case-13
    case "editProduct":
      const updatedProducts = state.products.map((product) =>
        product.id === action.payload.id
          ? {
              ...product,
              ...action.payload,
              id: product.id,
              categoryId: product.categoryId,
              isDeleted: false,
            }
          : product
      );

      return {
        ...state,
        products: updatedProducts,
        selectProduct: null,
        name: "",
        quantityPerUnit: "",
        unitPrice: "",
        unitsInStock: "",
      };
    // case-14
    case "setSelectProduct":
      return {
        ...state,
        selectProduct: action.payload,
      };
  }
};
