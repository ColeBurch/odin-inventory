import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import ProductDetail from "./pages/ProductDetail";
import CategoryAddPage from "./pages/CategoryAddPage";
import CategoryDeletePage from "./pages/CategoryDeletePage";
import CategoryDetailPage from "./pages/CategoryDetailPage";
import SignInPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";

export const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/category/form/add" element={<CategoryAddPage />} />
        <Route path="/category/form/delete" element={<CategoryDeletePage />} />
        <Route path="/category/:id" element={<CategoryDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
