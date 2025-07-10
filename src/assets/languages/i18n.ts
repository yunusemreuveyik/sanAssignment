import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "tr",
  fallbackLng: "tr",
  ns: [], // no initial namespace
  interpolation: {
    escapeValue: false,
  },
  resources: {},
});

export default i18n;
