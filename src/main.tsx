import "virtual:svg-icons-register";
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import "./assets/iconfont/iconfont.css";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
