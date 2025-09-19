import { Route, Routes } from "react-router-dom";

import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/cartcontext";
import Header from "./components/Header";
import OrderDetailPage from "./pages/OrderDetailPage";
import OrdersPage from "./pages/OrderPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductPage from "./pages/ProductPage";

export default function App() {
  return (
    <CartProvider>
      <Header />
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/order/:id" element={<OrderDetailPage />} />
      </Routes>
    </CartProvider>
  );
}
