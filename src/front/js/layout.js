import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { ToastContainer } from "react-toastify";

import { Home } from "./pages/home";
// import { Demo } from "./pages/demo";
// import { Single } from "./pages/single";
import Login from "./pages/Login/Login";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import SimpleBackdrop from "./component/BackdropLoader/BackdropLoader";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
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
        <ScrollToTop>
          <SimpleBackdrop />
          {window.location.pathname != "/" && <Navbar />}
          <Routes>
            <Route index element={<Login />} />
            <Route element={<Home />} path="/" />
            {/* <Route element={<Demo />} path="/demo" />
            <Route element={<Single />} path="/single/:theid" /> */}
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          {window.location.pathname != "/" && <Footer />}
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
