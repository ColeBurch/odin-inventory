import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CategoryDetail from "../components/CategoryDetail";

const CategoryDetailPage = () => {
  return (
    <main className="font-sans antialiased text-gray-600 min-h-full flex flex-col">
      <Header />
      <CategoryDetail />
      <Footer />
    </main>
  );
};

export default CategoryDetailPage;
