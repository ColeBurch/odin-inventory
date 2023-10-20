import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CategoryDeleteForm from "../components/CategoryDeleteForm";

const CategoryDeletePage = () => {
  return (
    <main className="font-sans antialiased text-gray-600 min-h-full flex flex-col">
      <Header />
      <CategoryDeleteForm />
      <Footer />
    </main>
  );
};

export default CategoryDeletePage;
