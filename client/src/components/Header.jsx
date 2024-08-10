import React from "react";
import logo from "../utils/logo.svg";
import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import { useLogOut } from "../hooks/useLogOut";

function Header() {
  const { user } = useAuthContext();
  const { logout } = useLogOut();

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
        <li className="nav-item">
          {user ? (
            <span className="nav-link">{user.username}</span>
          ) : (
            <Link className="nav-link text-black" to="/login">
              Login
            </Link>
          )}
        </li>
        <li className="nav-item me-1">
          {user ? (
            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          ) : (
            ""
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Header;
