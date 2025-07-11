import React, { useEffect } from "react";
import { useAuth } from "../../api/services/useAuth";
import { useNav } from "../../routes/nav";
import { routeNames } from "../../routes/routes";
import "./loginPage.scss";
import { useTranslation } from "react-i18next";

const LoginPage: React.FC = () => {
  const { login, user } = useAuth();
  const { go } = useNav();
  const { t } = useTranslation("loginPage");

  const handleLogin = () => {
    login();
  };

  useEffect(() => {
    if (user) {
      go(routeNames.home);
    }
  }, [user, go]);

  return (
    <div className="login">
      <h1 className="login__title">{t("welcome")}</h1>
      <form
        className="login__form"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <input
          type="text"
          placeholder={t("emailPlaceholder")}
          className="login__input"
        />
        <input
          type="password"
          placeholder={t("passwordPlaceholder")}
          className="login__input"
        />
        <button type="submit" className="login__button">
          {t("loginButton")}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
