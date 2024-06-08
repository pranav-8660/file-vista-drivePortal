import React, { useState, useEffect } from 'react';
import './image.css'; // Import CSS file for styling

function ImageGallery() {
  const [imageUrls, setImageUrls] = useState([]);
  const [fileInput, setFileInput] = useState(null);
  const [showFileInput, setShowFileInput] = useState(false);
  const [showDeleteOptions, setShowDeleteOptions] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch(`http://localhost:5000/aws-client-handler/fetch-files/fromFolder/images/forUser/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
      });
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      const data = await response.json();
      setImageUrls(data);
    } catch (error) {
      console.error('Error fetching images:', error);
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

      const response = await fetch(`http://localhost:5000/aws-client-handler/add-proper-file-to-folder/tagNumber/1/userName/${username}`, {
        method: 'POST', // Change the method to PUT for your API
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to add file');
      }

      // File added successfully, refresh image gallery
      fetchImages();
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

  const handleImageSelectionChange = (imageUrl) => {
    setSelectedImages((prevSelectedImages) => {
      if (prevSelectedImages.includes(imageUrl)) {
        return prevSelectedImages.filter((selectedImageUrl) => selectedImageUrl !== imageUrl);
      } else {
        return [...prevSelectedImages, imageUrl];
      }
    });
  };

  const handleDeleteImages = async () => {
    try {
      if (selectedImages.length === 0) {
        alert("Please select images to delete.");
        return;
      }

      const response = await fetch('http://localhost:5000/aws-client-handler/delete-from-folder', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedImages)
      });

      if (!response.ok) {
        throw new Error('Failed to delete images');
      }

      // Images deleted successfully, refresh image gallery
      fetchImages();
    } catch (error) {
      console.error('Error deleting images:', error);
    } finally {
      // Reset selected images and hide delete options
      setSelectedImages([]);
      setShowDeleteOptions(false);
    }
  };

  return (
    <div className="image-gallery-container">
      <center><h1>Image Gallery</h1></center>
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
          <h2>Select Images to Delete:</h2>
          {imageUrls.map((imageUrl, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`image-${index}`}
                checked={selectedImages.includes(imageUrl)}
                onChange={() => handleImageSelectionChange(imageUrl)}
              />
              <label htmlFor={`image-${index}`}>
                <img src={imageUrl} alt={`Image ${index}`} className="delete-image" />
              </label>
            </div>
          ))}
          <button onClick={handleDeleteImages}>Delete Selected Images</button>
        </div>
      )}
      <div className="image-container">
        {imageUrls.map((imageUrl, index) => (
          <a key={index} href={imageUrl} target="_blank" rel="noopener noreferrer">
            <img src={imageUrl} alt={`Image ${index}`} className="gallery-image" />
          </a>
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
