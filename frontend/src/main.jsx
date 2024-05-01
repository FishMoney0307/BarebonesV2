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
import Login from "./Provider/Login.jsx";
import Logout from "./Provider/Logout.jsx";
import Signup from "./Provider/Signup.jsx";
import ProtectedRoute from "./Provider/ProtectedRoute.jsx";
import "./index.css";
import AuthProvider, { useAuth } from "./Provider/authProvider.jsx";

//const { token } = useAuth();

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
    element: <App/>,
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
    path: "/login",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/logout",
    element: <App />,
    children: [
      {
        path: "/logout",
        element: <Logout />,
      },
    ],
  },
  {
    path: "/signup",
    element: <App />,
    children: [
      {
        path: "/signup",
        element: <Signup />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);