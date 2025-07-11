import React from "react";
import { useTranslation } from "react-i18next";
import "./languageSwitcher.scss";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher">
      <button
        onClick={() => changeLanguage("en")}
        className={i18n.language === "en" ? "active" : ""}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage("tr")}
        className={i18n.language === "tr" ? "active" : ""}
      >
        TR
      </button>
    </div>
  );
};

export default LanguageSwitcher;
