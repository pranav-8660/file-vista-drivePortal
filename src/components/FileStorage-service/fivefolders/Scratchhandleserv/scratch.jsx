import React, { useState, useEffect } from 'react';
import './scratchs.css'; // Import CSS file for styling
import excelLogo from './images/xls-file.png'; // Import placeholder image for Excel files
import wordLogo from './images/word.png'; // Import placeholder image for Word files
import pdfLogo from './images/pdf.png'; // Import placeholder image for PDF files
import txtLogo from './images/text.png'; // Import placeholder image for Text files

function ScratchGall() {
  const [fileUrls, setFileUrls] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await fetch(`http://localhost:5000/aws-client-handler/fetch-files/fromFolder/scratch/forUser/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
      });
      if (!response.ok) {
        throw new Error('Failed to fetch files');
      }
      const data = await response.json();
      setFileUrls(data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const getFileIcon = (filename) => {
    const extension = filename.split('.').pop().toLowerCase();
    switch (extension) {
      case 'xls':
      case 'xlsx':
        return excelLogo;
      case 'doc':
      case 'docx':
        return wordLogo;
      case 'pdf':
        return pdfLogo;
      case 'txt':
        return txtLogo;
      default:
        return excelLogo;
    }
  };

  return (
    <div className="file-gallery-container">
      <center><h1>Scratch Gallery</h1></center>
      <div className="file-container">
        {fileUrls.map((fileUrl, index) => (
          <div key={index}>
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              <img src={getFileIcon(fileUrl)} alt="File Logo" className="file-logo" />
            </a>
            <p>{fileUrl.split('/').pop()}</p> {/* Display file name */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScratchGall;
