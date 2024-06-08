import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [response, setResponse] = useState('');

  const handleForgotPassword = async () => {
    try {
      const url = `http://localhost:8000/signup-asNewUser/EmailId/${email}`;
      const res = await axios.put(url);

      // Display the response
      setResponse(res.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
    <center><h1>Forgot Password?</h1></center>
    <div className="container">
        <center><label htmlFor="email">Email:</label></center>
      
      <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <button type="button" onClick={handleForgotPassword}>Submit</button>
      <p>{response}</p>
    </div>
    
    </>
   
  );
};

export default ForgotPassword;
