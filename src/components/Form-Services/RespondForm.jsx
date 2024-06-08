import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './FormCreateRespond.css';

const FormComponent = () => {
  const [id, setId] = useState('');
  const [formParameters, setFormParameters] = useState([]);
  const [formInputs, setFormInputs] = useState({});
  const [responderName, setResponderName] = useState('');
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:6615/form-mining/retrieve-listOf-keys/id/${id}`);
      const data = await response.json();
      setFormParameters(data.keyList);
      setShowForm(true); // Show the form after fetching form parameters
    } catch (error) {
      console.error('Error fetching form parameters:', error);
    }
  };

  const handleInputChange = (paramName, value) => {
    setFormInputs((prevInputs) => ({ ...prevInputs, [paramName]: value }));
  };

  const handleSubmit = () => {
    // Trigger API call to retrieve list of keys after submitting the creator's name
    fetchData();
  };

  const handleFormSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:6615/form-mining/respond-to-form/creator/${id}/responder/${encodeURIComponent(responderName)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.values(formInputs).map(String)),
      });

      const responseData = await response.text(); // Assuming the response is a string
      toast.success(responseData); // Display success message using react-toastify
      setTimeout(() => {
        window.location.reload(); // Refresh the page after showing the response
      }, 3000); // Adjust the delay as per your preference
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form'); // Display error message using react-toastify
    }
  };

  return (
    <div className="container">
      <ToastContainer /> {/* ToastContainer is the container where toast notifications will be rendered */}
      <center><label htmlFor="id">Enter Form Creator's ID:</label></center>
      
      <input type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} />
      <center>
      <button type="button" className="button" onClick={handleSubmit}>
        Submit Creator's Name
      </button>
      </center>

      {showForm && (
        <form>
          {formParameters.map((param) => (
            <div key={param}>
              <label htmlFor={param}>{param}:</label>
              <input
                type="text"
                id={param}
                value={formInputs[param] || ''}
                onChange={(e) => handleInputChange(param, e.target.value)}
              />
            </div>
          ))}

          <div>
            <label htmlFor="responderName">Responder's Name:</label>
            <input
              type="text"
              id="responderName"
              value={responderName}
              onChange={(e) => setResponderName(e.target.value)}
            />
          </div>
          <center>
          <button type="button" className="button" onClick={handleFormSubmit}>
            Submit Form
          </button>
          </center>
        </form>
      )}
    </div>
  );
};

export default FormComponent;
