import React from 'react';
import './FormPage.css'; // Import CSS file

function HomePage() {
    const handleCreateForm = () => {
        console.log("Navigate to form creation page");
        window.location.href = '/create-a-form';
    };

    const handleRespondToForm = () => {
        console.log("Navigate to form response page");
        window.location.href = '/respond-to-a-form';
    };

    return (
        <div className="home-page-container">
            <h1>Form Management System</h1>
            <div>
                <button onClick={handleCreateForm}>Create Form</button>
                <button onClick={handleRespondToForm}>Respond to Form</button>
            </div>
        </div>
    );
}

export default HomePage;
