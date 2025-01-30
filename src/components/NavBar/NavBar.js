import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import logoImg from "../../images/logo.png";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [toggleMenu, setToggleMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Toggle menu state
  const handleNavbar = () => setToggleMenu(!toggleMenu);

  // Update active link
  const onUpdateActiveLink = (value) => setActiveLink(value);

  // Scroll event listener
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
      <div className="container navbar-content flex">
        <div className="brand-and-toggler flex flex-sb">
          <Link to="/" className="navbar-brand flex">
            <img src={logoImg} alt="site logo" />
            <span className="text-uppercase fw-7 fs-24 ls-1">BookHub</span>
          </Link>
          <button
            type="button"
            className="navbar-toggler-btn"
            onClick={handleNavbar}
          >
            <HiOutlineMenuAlt3
              size={35}
              style={{
                color: toggleMenu ? "#fff" : "#010101",
              }}
            />
          </button>
        </div>

        <div
          className={
            toggleMenu
              ? "navbar-collapse show-navbar-collapse"
              : "navbar-collapse"
          }
        >
          <ul className="navbar-nav">
            <li className="nav-item">
             
              <Link to="/" className={`nav-link text-uppercase text-white fs-22 fw-6 ls-1 ${activeLink === "home" ? "active navbar-link" : "navbar-link"}`}
                onClick={() => onUpdateActiveLink("home")} > Home </Link>

            </li>

            <li className="nav-item">
             
             <Link to="/explore" className={`nav-link text-uppercase text-white fs-22 fw-6 ls-1 ${activeLink === "explore" ? "active navbar-link" : "navbar-link"}`}
               onClick={() => onUpdateActiveLink("explore")} > Explore </Link>

           </li>

            <li className="nav-item">
            
                <Link to="/about" className={`nav-link text-uppercase text-white fs-22 fw-6 ls-1 ${activeLink === "about" ? "active navbar-link" : "navbar-link"}`} 
                onClick={() => onUpdateActiveLink("about")} > About </Link>

            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




