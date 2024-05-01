import React, { useContext } from 'react'
import {Navigate, Outlet} from "react-router-dom";
import { useAuth, AuthContext } from './authProvider';
import Navbar from '../Navbar';

const ProtectedRoute = () => {
  const { token } = useContext(AuthContext);

  return <div>Token is {token}</div>;
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