import React from "react";
import "./404Page.scss";
import { useTranslation } from "react-i18next";

const NotFound: React.FC = () => {
  const { t } = useTranslation("404Page");

  return (
    <div className="notfound">
      <h1 className="notfound__title">{t("title")}</h1>
      <p className="notfound__message">{t("message")}</p>
    </div>
  );
};

export default NotFound;
