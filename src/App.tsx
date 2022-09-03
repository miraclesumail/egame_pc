import { Provider, useSelector } from "react-redux";
import React from "react";
import "@/i18n";
import { IntlProvider } from "react-intl";
import { PersistGate } from "redux-persist/integration/react";
// import neffos from "neffos.js";
import locales from "@/locales";
import { Locale } from "@/store/slices/config.slice";
import GlobalView from "./components/GlobalkStyle";
import Router from "./routers";
import { getLocaleSelector } from "./store/slices/config.slice";
import { persistor } from "./store";

// 引入styled
function App() {
  const locale: Locale = useSelector(getLocaleSelector);
  console.log(locale, "localelocalelocalelocale");
  function onError(e: any) {
    console.log(e);
  }

  return (
    <>
      <GlobalView />
      <Router />
    </>
  );
}

export default App;
