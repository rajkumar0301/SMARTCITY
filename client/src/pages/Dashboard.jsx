import { useEffect, useState } from 'react';
import supabase from '@/lib/supabaseClient';

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Dashboard</h1>
      {user ? (
        <>
          <p>Welcome, {user.email}</p>
          <p>User ID: {user.id}</p>
        </>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
}

export default Dashboard;
