import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import { toast, Zoom } from "react-toastify";
import { initialState, reducer } from "../reducer/reducer";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //! Kategorileri getirme
  const bringCategory = async () => {
    const url = "http://localhost:3005/categories";
    const response = await axios.get(url);
    const categories = await response.data;
    dispatch({ type: "bringCategory", payload: categories });
  };

  //! ürünleri getirme
  const bringProduct = async () => {
    let url = "http://localhost:3005/products";
    if (state.selectCategory && state.selectCategory !== "0") {
      url = url + `?categoryId=${state.selectCategory}`;
    }
    const response = await fetch(url);
    const products = await response.json();
    dispatch({ type: "bringProduct", payload: products });
  };

  //! Card üzerindeki düzenle butonu için
  const editCard = async (id) => {
    try {
      const url = `http://localhost:3005/products/${id}`;
      const response = await axios.get(url);
      const editCard = response.data;

      // Form alanlarını doldur
      dispatch({ type: "editCards", payload: editCard });
      // Seçili ürünü ayarla
      dispatch({ type: "setSelectProduct", payload: editCard });
    } catch (error) {
      toast.error("Ürün yüklenemedi!");
    }
  };

  //! ürün ekleme/düzenleme
  const productAddEdit = async (news) => {
    if (!state.selectProduct) {
      // ürün ekleme
      // id ekleme
      news.id = (Number(state.store[state.store.length - 1].id) + 1).toString();
      const url = "http://localhost:3005/products";
      const response = await axios.post(url, news);

      //  ürün ekleme ekrana
      // setStore((prev) => [...prev, news]);
      // case-10
      dispatch({ type: "addProduct", payload: news });
      toast.success("Product added!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });
    } else {
      try {
        // Güncellenecek ürün verisi
        const updatedProduct = {
          ...state.selectProduct, // Mevcut ürün bilgilerini koru
          name: news.name,
          quantityPerUnit: news.quantityPerUnit,
          unitPrice: news.unitPrice,
          unitsInStock: news.unitsInStock,
        };

        // API'yi güncelle
        const url = `http://localhost:3005/products/${state.selectProduct.id}`;
        const response = await axios.put(url, updatedProduct);

        if (response.status === 200) {
          // State'i güncelle
          dispatch({ type: "editProduct", payload: response.data });

          toast.success("Ürün güncellendi!");
        }
      } catch (error) {
        toast.error("Güncelleme başarısız!");
        console.error(error);
      }
    }
  };

  //! kitap silme
  const removeProduct = async (id) => {
    const result = window.confirm("Are you sure?");
    if (result) {
      const url = `http://localhost:3005/products/${id}`;
      const response = await axios.patch(url, { isDeleted: true });
      dispatch({ type: "removeProduct", payload: id });

      toast.error("Product deleted!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });
    }
  };

  //! form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    productAddEdit({
      name: state.name,
      quantityPerUnit: state.quantityPerUnit,
      unitPrice: state.unitPrice,
      unitsInStock: state.unitsInStock,
    });
    // case-3 form resetleme

    dispatch({ type: "formReset" }); //herhangi bir payloada gerek yok çünkü reduce ta resetleme işlemi yapıyoruz
  };

  useEffect(() => {
    bringCategory();
  }, []);

  useEffect(() => {
    bringProduct();
  }, [state.selectCategory]);

  return (
    <DataContext.Provider
      value={{
        removeProduct,
        editCard,
        handleSubmit,
        state,
        dispatch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataContext;
