import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "./reduxStore/store";
import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { CompHeader } from "./Component/CompHeader";

const MainApp = () => {
  const getAppStoreData = useSelector((state) => state.appstate.login_info);

  return (
    <>
      {getAppStoreData.isloggedin === true && <CompHeader />}
      <App />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
let persistor = persistStore(store);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <MainApp />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
