import React from "react";
import { useAuth } from "../../api/useAuth";
import { useNav } from "../../routes/nav";
import { Link } from "react-router-dom";
import { routes } from "../../routes/routes";
import "./navbar.scss";
import { hasPermission } from "../../routes/pagePermissions";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const { logout, user } = useAuth();
  const { go, get } = useNav();
  const { t } = useTranslation("navbar");

  const handleLogout = () => {
    logout();
    go("login");
  };

  const navLinks = [
    { label: t("home"), routeName: "home" },
    { label: t("postsList"), routeName: "posts" },
    { label: t("createPost"), routeName: "createPost" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <div className="navbar__brand">
          {get("home") && <Link to={get("home")!}>{t("brand")}</Link>}
        </div>
        <ul className="navbar__links">
          {navLinks.map((link) => {
            const url = get(link.routeName);
            const route = routes.find((r) => r.name === link.routeName);
            const requiredPerms = route?.permissions || [];

            const hasAccess =
              requiredPerms.length === 0 ||
              hasPermission(user, requiredPerms, "any");

            if (!url || !hasAccess) return null;

            return (
              <li key={link.routeName}>
                <Link to={url}>{link.label}</Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="navbar__right">
        {user && (
          <span className="navbar__user">
            {t("hello")}, {user.name}
          </span>
        )}
        <button className="navbar__logout" onClick={handleLogout}>
          {t("logout")}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
