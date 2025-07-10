import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import navbar translations directly
import navbarTR from "../../../public/locales/tr/navbar.json";
import navbarEN from "../../../public/locales/en/navbar.json";

i18n.use(initReactI18next).init({
  lng: "tr",
  fallbackLng: "tr",
  ns: ["navbar"], // preload navbar namespace
  defaultNS: "navbar",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    tr: {
      navbar: navbarTR,
    },
    en: {
      navbar: navbarEN,
    },
  },
  react: {
    useSuspense: true,
  },
});

export default i18n;
