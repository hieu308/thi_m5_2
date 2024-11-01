import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
import ListBook from "./components/ListBook";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer} from "react-toastify";
import AddBook from "./components/Add";
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<ListBook />} />
          <Route path="/add" element={<AddBook />} />
        </Routes>
        <ToastContainer/>

      </BrowserRouter>
  );
}

export default App;
