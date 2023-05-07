import React from "react";
import Footer from "./Footer.js";
import Header from "./Header.js";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description}></meta>
        <meta name="keywords" content={keywords}></meta>
        <meta name="author" content={author}></meta>
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "75vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce-Shoping App",
  description: "Full Stack",
  keywords: "mern , react, node, mongodb",
  author: "Mayank",
};

export default Layout;
