import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');

  const handleLogin = async () => {
    try {
      const url = `http://localhost:8000/signup-asNewUser/${username}/${password}`;
      const res = await axios.get(url);
      
      if (res.data) {
        // Store username in local storage upon successful login
        localStorage.setItem('username', username);
        
        // Redirect to Navbar component
        window.location.href = '/navbar';
      } else {
        setResponse('Wrong password, Please try again!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <center><h1>User Login</h1></center>
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" placeholder='enter your username' value={username} onChange={(e) => setUsername(e.target.value)} required />

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" placeholder='enter your password' value={password} onChange={(e) => setPassword(e.target.value)} required />

      <button type="button" onClick={handleLogin}>Submit</button>
      <p>{response}</p>

      {/* Implement your own navigation logic for Forgot Password */}
      <a href="/forgot-password">Forgot Password?</a>
    </div>
  );
};

export default Login;
