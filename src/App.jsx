// import React, { useState } from 'react';
// import Navbar from './Components/Navbar';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './Components/Home';
// import Contact from './Components/Contact';
// import Services from './Components/Services';
// import ProductProvider from './Context/ProductProvider';
// import CartList from './Components/CartList';
// import AddProduct from './Components/AddProduct';
// import Login from './Components/Login';
// import SignUp from './Components/SignUp';
// import SearchResult from './Components/SearchResult';
// import Products from './Components/Products';


// const App = () => {
  
//   return (
//     <>
//         <ProductProvider>
//           <BrowserRouter>
//             <Navbar />
//             <div className="pt-16">
//               <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/products" element={<Products />} />
//                 <Route path="/contact" element={<Contact />} />
//                 <Route path="/services" element={<Services />} />
//                 <Route path="/cart_list" element={<CartList />} />
//                 <Route path="/addproduct" element={<AddProduct />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/signup" element={<SignUp />} />
//                 <Route path="/search/:searchQuery" element={<SearchResult />} />
//               </Routes>
//             </div>
//           </BrowserRouter>
//         </ProductProvider>
//     </>
//   );
// }

// export default App











//grok
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import { CartProvider } from "./Context/CartContext";
import ProductProvider from "./Context/ProductProvider";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Contact from "./Components/Contact";
import Services from "./Components/Services";
import CartList from "./Components/CartList";
import AddProduct from "./Components/AddProduct";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import SearchResult from "./Components/SearchResult";
import Products from "./Components/Products";

const App = () => {
  return (
    <AuthProvider>
        <ProductProvider>
      <CartProvider>
          <BrowserRouter>
            <Navbar />
            <div className="pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/services" element={<Services />} />
                <Route path="/cart_list" element={<CartList />} />
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/search/:searchQuery" element={<SearchResult />} />
              </Routes>
            </div>
          </BrowserRouter>
      </CartProvider>
        </ProductProvider>
    </AuthProvider>
  );
};

export default App;