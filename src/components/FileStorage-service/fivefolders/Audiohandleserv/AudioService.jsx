import React, { useState, useEffect } from 'react';
import './audios.css'; // Import CSS file for styling

function AudioGallery() {
  const [audioUrls, setAudioUrls] = useState([]);
  const [fileInput, setFileInput] = useState(null);
  const [showFileInput, setShowFileInput] = useState(false);
  const [showDeleteOptions, setShowDeleteOptions] = useState(false);
  const [selectedAudios, setSelectedAudios] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetchAudios();
  }, []);

  const fetchAudios = async () => {
    try {
      const response = await fetch(`http://localhost:5000/aws-client-handler/fetch-files/fromFolder/audios/forUser/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
      });
      if (!response.ok) {
        throw new Error('Failed to fetch audios');
      }
      const data = await response.json();
      setAudioUrls(data);
    } catch (error) {
      console.error('Error fetching audios:', error);
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

      const response = await fetch(`http://localhost:5000/aws-client-handler/add-proper-file-to-folder/tagNumber/3/userName/${username}`, {
        method: 'POST', // Change the method to PUT for your API
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to add file');
      }

      // File added successfully, refresh audio gallery
      fetchAudios();
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

  const handleDeleteAudios = async () => {
    try {
      const response = await fetch('http://localhost:5000/aws-client-handler/delete-from-folder', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedAudios)
      });

      if (!response.ok) {
        throw new Error('Failed to delete audios');
      }

      // Audios deleted successfully, refresh audio gallery
      fetchAudios();
    } catch (error) {
      console.error('Error deleting audios:', error);
    } finally {
      // Hide delete options
      setShowDeleteOptions(false);
      // Clear selected audios
      setSelectedAudios([]);
    }
  };

  const handleCheckboxChange = (event, audioUrl) => {
    if (event.target.checked) {
      setSelectedAudios([...selectedAudios, audioUrl]);
    } else {
      setSelectedAudios(selectedAudios.filter(url => url !== audioUrl));
    }
  };

  return (
    <div className="audio-gallery-container">
      <center><h1>Audio Gallery</h1></center>
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
          <h2>Select Audios to Delete:</h2>
          {audioUrls.map((audioUrl, index) => (
            <div key={index}>
              <input
                type="checkbox"
                checked={selectedAudios.includes(audioUrl)}
                onChange={(event) => handleCheckboxChange(event, audioUrl)}
              />
              <span>{audioUrl}</span>
            </div>
          ))}
          <button onClick={handleDeleteAudios}>Delete Selected Audios</button>
        </div>
      )}
      <div className="audio-container">
        {audioUrls.map((audioUrl, index) => (
          <audio key={index} controls>
            <source src={audioUrl} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        ))}
      </div>
    </div>
  );
}

export default AudioGallery;
