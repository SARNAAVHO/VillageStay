import React from "react";
import Header from "../components/Header";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <footer className="text-center py-6 bg-gray-100 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-300">
        © {new Date().getFullYear()} VillageStay. All rights reserved.
      </footer>
    </div>
  );
};

export default MainLayout;