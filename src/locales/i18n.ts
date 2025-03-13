import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./en.json";
import es from "./es.json";

i18n
  .use(LanguageDetector) // Detects user's language
  .use(initReactI18next) // Initializes i18next for React
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    fallbackLng: "en", // Default language
    interpolation: { escapeValue: false }, // Prevents XSS vulnerabilities
  });

export default i18n;
