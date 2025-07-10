import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "tr",
  fallbackLng: "tr",
  ns: [], // initially no namespaces
  defaultNS: "loginPage", // fallback namespace if not loaded yet
  interpolation: {
    escapeValue: false,
  },
  resources: {}, // will load dynamically
});

export default i18n;
