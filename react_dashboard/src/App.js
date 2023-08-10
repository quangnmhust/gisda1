import React from 'react';
import Dashboard from './component/dashboard/dashboard';
import { ApiContext } from './context/ApiProvider';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './component/login/login';
import './app.css';
import Register from './component/login/register';
import { useContext } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const { setUserInfo, user } = useContext(ApiContext);

  const getUserInfo = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.defaults.withCredentials = false;
        const response = await axios.get('http://localhost:8000/v1/user');
        if (response && response.data) {
          setUserInfo(response.data);
        }
      }
    } catch (error) {
      console.error('Error fetching API data:', error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
