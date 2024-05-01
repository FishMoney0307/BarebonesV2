import React, { useContext } from 'react'
import {Navigate, Outlet} from "react-router-dom";
import { useAuth, AuthContext } from './authProvider';
import Navbar from '../Navbar';

const ProtectedRoute = () => {
  const { token } = useContext(AuthContext);

  //Check user authentication
  if (token === null) {
    //If not authenticated, MAKE THEM
    return <Navigate to ="/login" />
  }
  
  //Let them in otherwise
  return <><Navbar /><Outlet /></>;
}

export default ProtectedRoute