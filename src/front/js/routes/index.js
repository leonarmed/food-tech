import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Container } from "@mui/material";

import { OrdersPage } from "../pages/Orders/OrdersPage";
// import { Demo } from "./pages/demo";
// import { Single } from "./pages/single";
import Login from "../pages/Login/Login";
import injectContext from "../store/appContext";

import Navbar from "../component/navbar";
import SimpleBackdrop from "../component/BackdropLoader/BackdropLoader";
import ProductsPage from "../pages/Products/ProductsPage";
import MyAccountPage from "../pages/MyAccount";
import OrdersManagerPage from "../pages/Orders/OrdersManagerPage";
import SettingsPage from "../pages/Settings";
import DashboardPage from "../pages/Dashboard";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <Container maxWidth="fixed">
      <BrowserRouter basename={basename}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <SimpleBackdrop />
        {/* {window.location.pathname != "/" &&
          window.location.pathname != "/orders" && <Navbar />} */}
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/account" element={<MyAccountPage />} />
            <Route path="/orders/manager" element={<OrdersManagerPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/login" index element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default injectContext(Layout);
