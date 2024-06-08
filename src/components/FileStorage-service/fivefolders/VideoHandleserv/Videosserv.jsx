import React, { useState, useEffect } from 'react';
import './videos.css'; // Import CSS file for styling

function VideoGallery() {
  const [videoUrls, setVideoUrls] = useState([]);
  const [fileInput, setFileInput] = useState(null);
  const [showFileInput, setShowFileInput] = useState(false);
  const [showDeleteOptions, setShowDeleteOptions] = useState(false);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch(`http://localhost:5000/aws-client-handler/fetch-files/fromFolder/videos/forUser/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
      });
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      const data = await response.json();
      setVideoUrls(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
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

      const response = await fetch(`http://localhost:5000/aws-client-handler/add-proper-file-to-folder/tagNumber/2/userName/${username}`, {
        method: 'POST', // Change the method to PUT for your API
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to add file');
      }

      // File added successfully, refresh video gallery
      fetchVideos();
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

  const handleDeleteVideos = async () => {
    try {
      const response = await fetch('http://localhost:5000/aws-client-handler/delete-from-folder', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedVideos)
      });

      if (!response.ok) {
        throw new Error('Failed to delete videos');
      }

      // Videos deleted successfully, refresh video gallery
      fetchVideos();
    } catch (error) {
      console.error('Error deleting videos:', error);
    } finally {
      // Hide delete options
      setShowDeleteOptions(false);
      // Clear selected videos
      setSelectedVideos([]);
    }
  };

  const handleCheckboxChange = (event, videoUrl) => {
    if (event.target.checked) {
      setSelectedVideos([...selectedVideos, videoUrl]);
    } else {
      setSelectedVideos(selectedVideos.filter(url => url !== videoUrl));
    }
  };

  return (
    <div className="video-gallery-container">
      <center><h1>Video Gallery</h1></center>
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
          <h2>Select Videos to Delete:</h2>
          {videoUrls.map((videoUrl, index) => (
            <div key={index}>
              <input
                type="checkbox"
                checked={selectedVideos.includes(videoUrl)}
                onChange={(event) => handleCheckboxChange(event, videoUrl)}
              />
              <span>{videoUrl}</span>
            </div>
          ))}
          <button onClick={handleDeleteVideos}>Delete Selected Videos</button>
        </div>
      )}
      <div className="video-container">
        {videoUrls.map((videoUrl, index) => (
          <video key={index} controls>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video element.
          </video>
        ))}
      </div>
    </div>
  );
}

export default VideoGallery;
