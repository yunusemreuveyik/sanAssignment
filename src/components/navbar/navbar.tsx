import React from "react";
import { useAuth } from "../../api/useAuth";
import { useNav } from "../../nav";
import { Link } from "react-router-dom";
import { routePaths } from "../../routes/routes";
import "./navbar.scss";

const Navbar: React.FC = () => {
  const { logout, user } = useAuth();
  const { go } = useNav();

  const handleLogout = () => {
    logout();
    go("login");
  };

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <div className="navbar__brand">
          <Link to={routePaths.home}>SAN</Link>
        </div>
        <ul className="navbar__links">
          <li>
            <Link to={routePaths.home}>Home</Link>
          </li>
          <li>
            <Link to={routePaths.postsList}>Posts List</Link>
          </li>
          <li>
            <Link to={routePaths.createPost}>Create Post</Link>
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
