import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './MailFlooding.css'; // Import CSS file

function MailForm() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [emailIds, setEmailIds] = useState(['']);
  const [files, setFiles] = useState([]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleEmailIdChange = (index, e) => {
    const newEmailIds = [...emailIds];
    newEmailIds[index] = e.target.value;
    setEmailIds(newEmailIds);
  };

  const addEmailIdField = () => {
    setEmailIds([...emailIds, '']);
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('message', message);
      formData.append('mailList', emailIds.join(',')); // Join emailIds into a single string

      // Check if files array is empty
      if (files.length > 0) {
        files.forEach((file) => formData.append('files', file));
      } else {
        // If files array is empty, send an empty array
        formData.append('files', JSON.stringify([])); // Send an empty array
      }

      const response = await axios.post(`http://localhost:8100/send-mail/with-attachments/${encodeURIComponent(title)}/${encodeURIComponent(message)}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data === true) {
        toast.success('Mail sent successfully.');
      } else {
        toast.error('Failed to send mail.');
      }
    } catch (error) {
      console.error('Error sending mail:', error);
      toast.error('Error sending mail.');
    }
  };

  return (
    <div className="mail-form-container">
      <h2>Email Flooding Service</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <br />
        <div>
          <label>Message:</label>
          <textarea value={message} onChange={handleMessageChange} />
        </div>
        <br />
        <div className="email-fields">
          <label>Email IDs:</label>
          {emailIds.map((email, index) => (
            <div className="email-field" key={index}>
              <input
                type="text"
                value={email}
                onChange={(e) => handleEmailIdChange(index, e)}
              />
            </div>
          ))}
          <br />
          <button type="button" className="add-email-button" onClick={addEmailIdField}>
            Add Email ID
          </button>
        </div>
        <br />
        <div>
          <label>Attachments:</label>
          <input type="file" multiple onChange={handleFileChange} />
        </div>
        <br />
        <button type="submit">Send Mail</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default MailForm;
