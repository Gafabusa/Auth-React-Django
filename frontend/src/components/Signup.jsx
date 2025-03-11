import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Sending signup data:', formData);
    try {
      const response = await axios.post('http://localhost:8000/api/signup/', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Signup response:', response.data);
      alert(response.data.message); // "User created successfully"
      navigate('/login');
    } catch (error) {
      const errorData = error.response?.data?.error;
      console.error('Signup error:', errorData);
      // Handle object errors (e.g., validation errors from Django)
      if (typeof errorData === 'object' && errorData !== null) {
        const errorMessage = Object.values(errorData)
          .flat() // Flatten arrays in case of multiple errors per field
          .join(', ');
        alert(`Signup failed: ${errorMessage}`);
      } else {
        alert(errorData || 'Signup failed. Check console for details.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
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
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Sign Up
        </button>
        <p className="mt-2 text-center">
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} className="text-blue-500 cursor-pointer">
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
