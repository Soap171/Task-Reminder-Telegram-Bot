import React from "react";
import logo from "../utils/logo.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar navbar-expand-md justify-content-between">
      <Link className="navbar-brand" to="/">
        <img
          src={logo}
          alt="Logo"
          width="30"
          height="24"
          className="d-inline-block align-text-top"
        />
        <span className="fw-bold">NotifiBot</span>
      </Link>
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <Link className="nav-link text-black" to="/about">
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-black" to="/contact">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
