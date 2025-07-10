import React from "react";
import { useAuth } from "../../api/useAuth";
import { useNav } from "../../routes/nav";
import { Link } from "react-router-dom";
import "./navbar.scss";

const Navbar: React.FC = () => {
  const { logout, user } = useAuth();
  const { go, get } = useNav();

  const handleLogout = () => {
    logout();
    go("login");
  };

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <div className="navbar__brand">
          <Link to={get.home.get()}>SAN</Link>
        </div>
        <ul className="navbar__links">
          <li>
            <Link to={get.home.get()}>Home</Link>
          </li>
          <li>
            <Link to={get.posts.get()}>Posts List</Link>
          </li>
          <li>
            <Link to={get.createPost.get()}>Create Post</Link>
          </li>
        </ul>
      </div>
      <div className="navbar__right">
        {user && <span className="navbar__user">Hello, {user.name}</span>}
        <button className="navbar__logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
