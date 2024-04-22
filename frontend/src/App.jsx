import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import React from 'react';
import ReactDOM from 'react-dom';
import AuthProvider from "./Provider/authProvider.jsx";

const App = () => {
  return (
    <>
    <AuthProvider>
    <div className="w-full p-6">
      <Navbar />
      <Outlet style={{"width" : "100%"}} />
    </div>
    </AuthProvider>
    </>
  );
};
export default App;
