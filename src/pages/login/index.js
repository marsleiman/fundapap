import React from 'react';
import Login from '../../components/login';
import { useUser } from '../../hooks/use-user';
import { Navigate } from "react-router-dom";

function LogIn() {
  const { user } = useUser();
  return (
    <>
      {user && user.name ? <Navigate to="/home" /> : <Login />}
    </>
  );
}

export default LogIn;