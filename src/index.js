import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { StoreProvider, createStore } from "easy-peasy";

import "./styles.css";
import Movies from "./components/Movies";
import MoviesForm from "./components/MoviesForm";
import Store from "./Store";
import Moviee from "./components/Moviee";
function App() {
  const store = createStore(Store);
  const [isShown, setIsShown] = useState(false);
  const handleScrolling = () => {
    if (window.pageYOffset >= 200) {
      setIsShown(true);
    } else {
      setIsShown(false);
    }
  };
  const handleClick = () => {
    window.scroll({
      top: 0,
      behavior: "smooth"
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScrolling);
    return () => {
      window.removeEventListener("scroll", handleScrolling);
    };
  }, []);
  return (
    <StoreProvider store={store}>
      <div className="py-5">
        <h1 className="text-primary text-center mb-4 mt-2">Top Movies</h1>
        <MoviesForm />
        <Movies />
      </div>
      {isShown && (
        <button
          className="btn btn-info rounded d-flex justify-content-center align-items-center scrolly-btn"
          onClick={handleClick}
        >
          &uarr;
        </button>
      )}
    </StoreProvider>
  );
}
const Root = (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/:id" exact component={Moviee} />
    </Switch>
  </BrowserRouter>
);
const rootElement = document.getElementById("root");
ReactDOM.render(Root, rootElement);
