import React from "react";
import Header from "../components/Header";
import InventoryPage from "../components/InventoryPage";
import Footer from "../components/Footer";

const Inventory = () => {
  return (
    <main className="font-sans antialiased text-gray-600 min-h-full flex flex-col">
      <Header />
      <InventoryPage />
      <Footer />
    </main>
  );
};

export default Inventory;
