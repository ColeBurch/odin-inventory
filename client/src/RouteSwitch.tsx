import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import ProductDetail from "./pages/ProductDetail";
import CategoryAddPage from "./pages/CategoryAddPage";
import CategoryDeletePage from "./pages/CategoryDeletePage";

export const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/category/form/add" element={<CategoryAddPage />} />
        <Route path="/category/form/delete" element={<CategoryDeletePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
