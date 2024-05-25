import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');
    if (token && userId) {
      setUser({ token, id: userId });
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_id', data.user.id);
        setUser({ token: data.token, id: data.user.id });
        navigate('/dashboard');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const register = async (credentials) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_id', data.user.id);
        setUser({ token: data.token, id: data.user.id });
        navigate('/dashboard');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;