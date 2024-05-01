import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";

import AuthProvider, { AuthContext } from "./Provider/authProvider";

import "./index.css";
import App from "./App";
import ProtectedRoute from "./Provider/ProtectedRoute";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);