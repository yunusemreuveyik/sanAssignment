import React from "react";
import "./403Page.scss";
import { useTranslation } from "react-i18next";

const Forbidden: React.FC = () => {
  const { t } = useTranslation("403Page");

  return (
    <div className="forbidden">
      <h1 className="forbidden__title">{t("title")}</h1>
      <p className="forbidden__message">{t("message")}</p>
    </div>
  );
};

export default Forbidden;
