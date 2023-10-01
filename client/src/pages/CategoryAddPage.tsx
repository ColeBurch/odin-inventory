import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CategoryAddForm from "../components/CategoryAddForm";

const CategoryAddPage = () => {
  return (
    <main className="font-sans antialiased text-gray-600 min-h-full flex flex-col">
      <Header />
      <CategoryAddForm />
      <Footer />
    </main>
  );
};

export default CategoryAddPage;
