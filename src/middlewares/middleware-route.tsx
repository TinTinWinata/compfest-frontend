import { useEffect } from 'react';
import { Routes, useNavigate } from 'react-router-dom';

export default function MiddlewareRoutes() {
  const navigate = useNavigate();

  // Passing User Auth From (UserContext.tsx)
  // const { isAuth } = useUserAuth();

  useEffect(() => {
    // if (!isAuth()) {
    // If not auth then go to '/' (login page at routes)
    // navigate('/');
    // }
    // --------------------------------
  }, []);

  return <Routes></Routes>;
}
