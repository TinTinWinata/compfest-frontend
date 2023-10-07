import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MiddlewareRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, []);

  return <></>;
}
