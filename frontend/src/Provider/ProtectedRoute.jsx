import React, { useContext } from 'react'
import {Navigate, Outlet} from "react-router-dom";
import { AuthContext } from './authProvider.jsx';
import Navbar from '../Navbar';

const ProtectedRoute = () => {
  const { token } = useContext(AuthContext);

  return ( <p>Token is {token}</p> )
/*
  //Check user authentication
  if (!token) {
    //If not authenticated, MAKE THEM
    return <Navigate to ="/login" />;
  }
  
  //Let them in otherwise
  return <><Navbar /><Outlet /></>; */
}

export default ProtectedRoute;