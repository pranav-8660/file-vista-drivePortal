import React, { useState, useEffect } from 'react';
import './files.css'; // Import CSS file for styling
import excelLogo from './images/xls-file.png'; // Import placeholder image for Excel files
import wordLogo from './images/word.png'; // Import placeholder image for Word files
import pdfLogo from './images/pdf.png'; // Import placeholder image for PDF files
import txtLogo from './images/text.png'; // Import placeholder image for Text files

function FileGallery() {
  const [fileUrls, setFileUrls] = useState([]);
  const [fileInput, setFileInput] = useState(null);
  const [showFileInput, setShowFileInput] = useState(false);
  const [showDeleteOptions, setShowDeleteOptions] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await fetch(`http://localhost:5000/aws-client-handler/fetch-files/fromFolder/files/forUser/${username}`, {
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

  const handleAddFile = () => {
    setShowFileInput(true);
  };

  const handleFileInputChange = (event) => {
    setFileInput(event.target.files[0]);
  };

  const handleUploadFile = async () => {
    try {
      if (!fileInput) {
        alert("Please select a file to upload.");
        return;
      }

      const formData = new FormData();
      formData.append('mfileinst', fileInput); // Change here to match the API request param name

      const response = await fetch(`http://localhost:5000/aws-client-handler/add-proper-file-to-folder/tagNumber/4/userName/${username}`, {
        method: 'POST', // Change the method to PUT for your API
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to add file');
      }

      // File added successfully, refresh file gallery
      fetchFiles();
    } catch (error) {
      console.error('Error adding file:', error);
    } finally {
      // Reset file input and hide it after upload
      setFileInput(null);
      setShowFileInput(false);
    }
  };

  const handleDeleteButtonClick = () => {
    setShowDeleteOptions(true);
  };

  const handleFileSelectionChange = (fileUrl) => {
    setSelectedFiles((prevSelectedFiles) => {
      if (prevSelectedFiles.includes(fileUrl)) {
        return prevSelectedFiles.filter((selectedFileUrl) => selectedFileUrl !== fileUrl);
      } else {
        return [...prevSelectedFiles, fileUrl];
      }
    });
  };

  const handleDeleteFiles = async () => {
    try {
      if (selectedFiles.length === 0) {
        alert("Please select files to delete.");
        return;
      }

      const response = await fetch('http://localhost:5000/aws-client-handler/delete-from-folder', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedFiles)
      });

      if (!response.ok) {
        throw new Error('Failed to delete files');
      }

      // Files deleted successfully, refresh file gallery
      fetchFiles();
    } catch (error) {
      console.error('Error deleting files:', error);
    } finally {
      // Reset selected files and hide delete options
      setSelectedFiles([]);
      setShowDeleteOptions(false);
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
      <center><h1>File Gallery</h1></center>
      <div className="buttons-container">
        {!showFileInput && (
          <button onClick={handleAddFile}>Add File</button>
        )}
        {showFileInput && (
          <>
            <input type="file" onChange={handleFileInputChange} />
            <button onClick={handleUploadFile}>Upload File</button>
          </>
        )}
        <button onClick={handleDeleteButtonClick}>Delete File</button>
      </div>
      {showDeleteOptions && (
        <div className="delete-options-container">
          <h2>Select Files to Delete:</h2>
          {fileUrls.map((fileUrl, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`file-${index}`}
                checked={selectedFiles.includes(fileUrl)}
                onChange={() => handleFileSelectionChange(fileUrl)}
              />
              <label htmlFor={`file-${index}`}>
                {fileUrl.split('/').pop()} {/* Display file name */}
              </label>
            </div>
          ))}
          <button onClick={handleDeleteFiles}>Delete Selected Files</button>
        </div>
      )}
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

export default FileGallery;
