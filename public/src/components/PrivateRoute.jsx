import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import supabase from '@/lib/supabaseClient';

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthenticated(!!session);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading...</p>;
  return authenticated ? children : <Navigate to="/login" />;
}
