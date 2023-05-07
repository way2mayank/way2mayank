import React from "react";
import "./App.css";
import Home from "./Pages/Home";
import Contect from "./Pages/Contect";
import About from "./Pages/About";
import PageNotFound from "./Pages/PageNotFound";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contect />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
