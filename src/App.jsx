import "./App.css";
import Navi from "./components/Navi";
import Sidebar from "./components/Sidebar";
import ProductList from "./components/ProductList";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import ProductDetay from "./components/detail/ProductDetay";
import LoginPage from "./components/LoginPage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/"
            element={
              <>
                <Navi />
                <div className="main-content">
                  <Sidebar />
                  <Outlet />
                </div>
              </>
            }
          >
            <Route index element={<ProductList />} />
            <Route path="product/:productId" element={<ProductDetay />} />
          </Route>
        </Routes>

        <ToastContainer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
