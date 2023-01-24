import React from 'react'
import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';

function ProtectedRoute({ children }: any) {
  const { user } = useUserAuth(); 

  if (user === null) {
    return <Navigate to="/retrend/" />;
  } 

  return children;       
}

export default ProtectedRoute;


