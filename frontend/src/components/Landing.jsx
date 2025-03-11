import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (!userId) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [userId, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    navigate('/login');
  };

  if (!userId) return null; // Prevent rendering until redirect

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <header className="p-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Business Promo</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </header>
      <main className="flex flex-col items-center justify-center h-full p-6">
        <h2 className="text-4xl font-extrabold mb-4">Welcome to Your Business Hub</h2>
        <p className="text-lg mb-6 text-center max-w-2xl">
          Boost your business with our cutting-edge solutions. Reach more customers, grow your brand, and succeed!
        </p>
        <button className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-500">
          Get Started
        </button>
      </main>
      <footer className="p-4 text-center">
        <p>© 2025 Business Promo. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;