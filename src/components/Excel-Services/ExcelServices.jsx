import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Xlfile.css';

const UploadXLFilePage = () => {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState('');
    const [primeTuples, setPrimeTuples] = useState([]);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!file || !username) {
            alert('Please select a file and ensure username is available in local storage');
            return;
        }

        const formData = new FormData();
        formData.append('xlfile', file);

        try {
            const response = await axios.post(`http://localhost:8906/get-list-from-xl/xl-file/username/${username}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Extracting prime tuples from the response data
            const primeTuples = response.data;

            // Setting prime tuples to state for rendering
            setPrimeTuples(primeTuples);
        } catch (error) {
            console.error('Error uploading file:', error);
            // Handle error
        }
    };

    return (
        <div className="upload-container">
            <h2>Upload Excel File</h2>
            <form className="upload-form" onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Submit</button>
            </form>

            {/* Rendering prime tuples */}
            {primeTuples.length > 0 && (
                <div className="prime-tuples-container">
                    <h3>Prime Tuples:</h3>
                    <ul>
                        {primeTuples.map((tuple, index) => (
                            <li key={index}>{tuple}</li>
                        ))}
                    </ul>
                    <br /><br /><br />
                    The converted file is available in the scratch folder which is present at file-storage-services.
                </div>
            )}
        </div>
    );
};

export default UploadXLFilePage;
