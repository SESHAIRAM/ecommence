import { BrowserRouter as Router, Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

// import "./assets/css/animate.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/bootstrap.min.css.map";
import "./App.css";
import "./assets/fontawesome/css/all.min.css"
import "./assets/fontawesome/css/fontawesome.min.css"
import { OPRoutes } from "./OPRoutes";
import { useSelector } from "react-redux";
import { Suspense } from "react";
import { OPLoader } from "./Component/OPLoader";

function App() {
  const l_Route = OPRoutes();
  const getAppStoreData = useSelector((state) => state.appstate.login_info);
  return (
    <>
      <Suspense fallback={<OPLoader />}>
        <Routes>
          {l_Route.map((item) => {
            return (
              <Route
                key={item.path}
                path={item.path}
                element={
                  item.isloggedin ? (getAppStoreData.isloggedin ? (item.element) : (
                    <Navigate to="/" />
                  )
                  ) : (item.element)
                }
              />
            );
          })}

        </Routes>
      </Suspense>
    </>
  );
}

export default App;
