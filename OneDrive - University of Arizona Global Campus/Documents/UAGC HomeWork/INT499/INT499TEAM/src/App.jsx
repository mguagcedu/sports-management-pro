import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";
import Login from "./Login";
import CheckoutPage from "./CheckoutPage";
import Cart from "./components/Cart"; 
import Home from "./components/HomePage"; 

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path="/checkout" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />

        <Route path="*" element={<PrivateRoute><Home /></PrivateRoute>} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
