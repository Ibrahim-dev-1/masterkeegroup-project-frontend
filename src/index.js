import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { AuthenticationProvider } from "./contexts/authenticationProvider";
import { FilesProvider } from "./contexts/filesProvider";

ReactDOM.render(
  <AuthenticationProvider>
      <FilesProvider>
        <App />
      </FilesProvider>
    ,
  </AuthenticationProvider>,
  document.getElementById("root")
);
