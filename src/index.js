import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context';
import './index.css';
import Home from './pages/Home/Home';
import Explore from "./components/Explore/Explore";
import About from "./pages/About/About";

import BookList from "./components/BookList/BookList";
import BookDetails from "./components/BookDetails/BookDetails";
import Navbar from "./components/NavBar/NavBar";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <BrowserRouter>
      <Routes>

        <Route path = "/" element = {<Home />}>
          <Route path = "book" element = {<BookList />} />
          <Route path = "/book/:id" element = {<BookDetails />} />
        </Route>

        <Route path = "/explore" element = {<Explore />}> 
          <Route path = "Navbar" element = {<Navbar />} />
        </Route>

        <Route path = "/about" element = {<About />}> 
          <Route path = "Navbar" element = {<Navbar />} />
        </Route>
      

      </Routes>
    </BrowserRouter>
  </AppProvider>
);
