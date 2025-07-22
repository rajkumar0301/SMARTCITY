import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import supabase from '@/lib/supabaseClient';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Register</Link>}
      </div>
      <div className="flex items-center gap-3">
        {user && <span>{user.email}</span>}
        {user && <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>}
      </div>
    </nav>
  );
  <Link to="/feedback">Feedback</Link>

}

export default Navbar;
