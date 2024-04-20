import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import Record from "./Components/Record";
import RecordList from "./Components/RecordList";
import Home from "./Home/Home.jsx";
import Contact from "./Contact/Contact.jsx";
import About from "./About/About.jsx";
import "./index.css";
import JWThome from "./Login/jwt-home.jsx";
import Safehouse from "./Login/safehouse.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/edit/:id",
    element: <App />,
    children: [
      {
        path: "/edit/:id",
        element: <Record />,
      },
    ],
  },
  {
    path: "/contact",
    element: <App />,
    children: [
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/about",
    element: <App />,
    children: [
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "/create",
    element: <App />,
    children: [
      {
        path: "/create",
        element: <Record />,
      },
    ],
  },
  {
    path: "/jwthome",
    element: <App />,
    children: [
      {
        path: "/jwthome",
        element: <JWThome />,
      },
    ],
  },
  {
    path: "/safehouse",
    element: <App />,
    children: [
      {
        path: "/safehouse",
        element: <Safehouse />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);