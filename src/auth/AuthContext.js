import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    console.log('Token from localStorage:', token);
    console.log('User ID from localStorage:', userId);
    console.log('Username from localStorage:', username);
    console.log('Password from localStorage:', password);
    if (token && userId && username && password) {
      setUser({ token, id: userId, username, password });
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
        console.log('Login response data:', data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_id', data.user.user_id);
        localStorage.setItem('username', credentials.username);
        localStorage.setItem('password', credentials.password);
        setUser({ token: data.token, id: data.user.user_id, username: credentials.username, password: credentials.password  });
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
        console.log('Register response data:', data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_id', data.user.user_id);
        localStorage.setItem('username', credentials.username);
        localStorage.setItem('password', credentials.password);
        setUser({ token: data.token, user_id: data.user.user_id, username: credentials.username, password: credentials.password  });
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
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    setUser(null);
    navigate('/login');
  };

  const deleteUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${user.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    } catch (error) {
      console.error('Error deleting user:', error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, deleteUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;