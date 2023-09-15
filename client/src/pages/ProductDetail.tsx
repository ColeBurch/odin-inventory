import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductDetailPage from "../components/ProductDetailPage";

const ProductDetail = () => {
  return (
    <main className="font-sans antialiased text-gray-600 min-h-full flex flex-col">
      <Header />
      <ProductDetailPage />
      <Footer />
    </main>
  );
};

export default ProductDetail;
