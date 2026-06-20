// src/i18n/index.ts

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import si from "./locales/si.json";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v4",
  resources: {
    en: {
      translation: en,
    },
    si: {
      translation: si,
    },
  },
  lng: "si",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
