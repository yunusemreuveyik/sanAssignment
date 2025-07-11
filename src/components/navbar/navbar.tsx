import React, { useState, useEffect } from "react";
import { useAuth } from "../../api/useAuth";
import { useNav } from "../../routes/nav";
import { Link } from "react-router-dom";
import { routes } from "../../routes/routes";
import { hasPermission } from "../../routes/pagePermissions";
import { useTranslation } from "react-i18next";
import "./navbar.scss";
import LanguageSwitcher from "../languageSwitcher/languageSwitcher";

const Navbar: React.FC = () => {
  const { logout, user } = useAuth();
  const { go, get } = useNav();
  const { t } = useTranslation("navbar");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    go("login");
  };

  const navLinks = [
    { label: t("home"), routeName: "home" },
    { label: t("postsList"), routeName: "posts" },
    { label: t("createPost"), routeName: "createPost" },
  ];

  // ✅ Close menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Close menu when navigating
  const handleNavClick = (url: string) => {
    setMenuOpen(false);
    go(url);
  };

  return (
    <div className="navbar-container">
      <div className="navbar-links-wrapper">
        <div className="logo-wrapper">
          {get("home") && (
            <Link to={get("home")!} onClick={() => setMenuOpen(false)}>
              {t("brand")}
            </Link>
          )}
        </div>

        <div className="navbar-links desktop">
          <ul>
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

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      </div>

      {menuOpen && (
        <div className="navbar-menu open">
          <div className="navbar-links mobile">
            <ul>
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
                    <Link
                      to={url}
                      onClick={() => handleNavClick(link.routeName)}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="navbar-right mobile">
            {user && (
              <span className="navbar-user">
                {t("hello")}, {user.name}
              </span>
            )}
            <LanguageSwitcher />
            <button className="navbar-logout" onClick={handleLogout}>
              {t("logout")}
            </button>
          </div>
        </div>
      )}

      <div className="navbar-right desktop">
        {user && (
          <span className="navbar-user">
            {t("hello")}, {user.name}
          </span>
        )}
        <LanguageSwitcher />
        <button className="navbar-logout" onClick={handleLogout}>
          {t("logout")}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
