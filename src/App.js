import React from "react";
import Header from "./components/Header/Header";

import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import PageOne from "./pages/PageOne";
import PageTwo from "./pages/PageTwo";
import PageThree from "./pages/PageThree";
import PageLogIn from "./pages/PageLogIn";
import Home from "./pages/Home";
import PageFour from "./pages/PageFour";

import { AnimatePresence } from "framer-motion";

function App() {
  const isToken = useSelector((state) => state.auth.token);
  const location = useLocation();

  return (
    <>
      <Header />
      <main>
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route path="/" exact>
              {isToken && <Home />}
              {!isToken && <PageLogIn />}
            </Route>
            <Route path="/page-one">
              {isToken && <PageOne />}
              {!isToken && <PageLogIn />}
            </Route>
            <Route path="/page-two">
              {isToken && <PageTwo />}
              {!isToken && <PageLogIn />}
            </Route>
            <Route path="/page-three">
              {isToken && <PageThree />}
              {!isToken && <PageLogIn />}
            </Route>
            <Route path="/page-four">
              {isToken && <PageFour />}
              {!isToken && <PageLogIn />}
            </Route>
            <Route path="/page-login">
              <PageLogIn />
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </AnimatePresence>
      </main>
    </>
  );
}

export default App;
