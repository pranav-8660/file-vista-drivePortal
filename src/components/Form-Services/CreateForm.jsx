import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './FormCreateRespond.css';

const DynamicForm = () => {
  const [formAttributes, setFormAttributes] = useState([]);
  const [name, setName] = useState('');

  const addAttribute = () => {
    setFormAttributes([...formAttributes, { value: '' }]);
  };

  const handleAttributeChange = (index, value) => {
    const updatedAttributes = [...formAttributes];
    updatedAttributes[index].value = value;
    setFormAttributes(updatedAttributes);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = formAttributes.map(({ value }) => value);

    try {
      const response = await fetch(`http://localhost:6615/form-mining/create-a-form/id/${encodeURIComponent(name)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(`Form data submitted successfully for ${name}`); // Display success message using react-toastify
        setFormAttributes([]);
        setName('');
      } else {
        console.error('Failed to submit form data');
        toast.error('Failed to submit form data'); // Display error message using react-toastify
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
      toast.error('Error submitting form data'); // Display error message using react-toastify
    }
  };

  return (
    <div className="dynamic-form-container">
      <ToastContainer /> {/* ToastContainer is the container where toast notifications will be rendered */}
      <label>
        <h2>Name of The Form Creator:</h2>
        <input
          type="text"
          value={name}
          placeholder="Enter Name"
          onChange={handleNameChange}
        />
      </label>

      <form id="dynamicForm" onSubmit={handleSubmit}>
        <h2>Create A Form:</h2>

        <div id="attributesContainer">
          {formAttributes.map(({ value }, index) => (
            <div key={index} className="attribute">
              <input
                type="text"
                value={value}
                placeholder="Attribute Name"
                onChange={(e) => handleAttributeChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>

        <button type="button" onClick={addAttribute}>
          Add Attribute
        </button>
        <br /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DynamicForm;
