import React, { useState, useEffect } from 'react';
import './signup.css';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    phoneNumber: '',
    password: '',
  });
  const [apiResponse, setApiResponse] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = `http://localhost:8000/signup-asNewUser/${formData.name}/${formData.password}/${formData.email}/${formData.dateOfBirth}/${formData.phoneNumber}`;

    try {
      // Make the API call with GET method
      const response = await fetch(apiUrl);

      // Assume the response is in plain text, adjust as needed
      const data = await response.text();

      // Update the state with the API response
      setApiResponse(data);

      // Show success message and reset form after 7 seconds
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        setFormData({
          name: '',
          email: '',
          dateOfBirth: '',
          phoneNumber: '',
          password: '',
        });
      }, 7000);
    } catch (error) {
      console.error('Error making API call:', error);
    }
  };

  useEffect(() => {
    // After 12 seconds, reset the success message
    const timeoutId = setTimeout(() => {
      setShowSuccessMessage(false);
    }, 12000);

    return () => clearTimeout(timeoutId);
  }, [showSuccessMessage]);

  return (
    <div>
      <center>
        <h1>Sign up to FileVista!</h1>
      </center>
      {showSuccessMessage ? (
        <div>
          <center>
            <p>You can login with the username that is sent to your email.</p>
          </center>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Date of Birth:
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Phone Number:
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>
          {apiResponse && (
            <div>
              <p>{apiResponse}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
