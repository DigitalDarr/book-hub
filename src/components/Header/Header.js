import React from 'react';
import Navbar from "../NavBar/NavBar";
import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";

const Header = () => {
  return (
    <div className='holder'>
        <header className='header'>
            <Navbar />
            <div className='header-content flex flex-c text-center text-white'>
                <h2 className='header-title text-capitalize'>find your book of choice.</h2><br />
                <p className='header-text fs-18 fw-3'>Whether you’re a casual browser, an avid reader, or someone rekindling their love for books, our search tools make it easy to find exactly what you're looking for. Start your search today!</p>
                <SearchForm />
            </div>
        </header>
    </div>
  )
}

export default Header;