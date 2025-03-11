import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Sending login data:', formData); // Debug log
    try {
      const response = await axios.post('http://localhost:8000/api/login/', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Login response:', response.data); // Debug log
      localStorage.setItem('user_id', response.data.user_id);
      alert(response.data.message); // "Login successful"
      navigate('/landing');
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message); // Debug log
      alert(error.response?.data?.error || 'Login failed. Check console for details.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Login
        </button>
        <p className="mt-2 text-center">
          Don’t have an account?{' '}
          <span onClick={() => navigate('/')} className="text-blue-500 cursor-pointer">
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;