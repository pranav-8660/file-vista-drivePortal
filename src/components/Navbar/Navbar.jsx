import React, { useState, useEffect } from 'react';
import './Navbar.css';

import image1 from '../images/file storage service.png';
import image2 from '../images/excel file services.png';
import image3 from '../images/email sending service.png';
import image4 from '../images/forms service.png';
import image5 from '../images/web crawling service.png';

export default function Navbar() {
    const [showDialog, setShowDialog] = useState(false);
    const [service, setService] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = [image1, image2, image3, image4, image5];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    const handleMouseEnter = (serviceName) => {
        setShowDialog(true);
        setService(serviceName);
    };

    const handleMouseLeave = () => {
        setShowDialog(false);
        setService('');
    };

    const handleLogout = () => {
        localStorage.clear(); // Clear localStorage
        window.location.href = '/login'; // Redirect to home.html
    };

    return (
        <div>
            <nav>
                <a href='/navbar'>
                    <svg id="logo-35" width="50" height="39" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" className="ccompli1" fill="#007AFF"></path>
                        <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" className="ccustom" fill="#312ECB"></path>
                    </svg>
                </a>
                <div>
                    <ul id='serviceList'>
                        <li><a className='active'>Home</a></li>
                        <li id="services">
                            <a>Services</a>
                            <ul>
                                <li>
                                    <a href="/folder-display-page" onMouseEnter={() => handleMouseEnter('File Storage Services')} onMouseLeave={handleMouseLeave}>File Storage Services</a>
                                    {showDialog && service === 'File Storage Services' && (
                                        <div className="dialogBox">Our file storage service securely stores images, audio, video, and various file formats including PDFs and Excel files.</div>
                                    )}
                                </li>
                                <li>
                                    <a href="/form-page" onMouseEnter={() => handleMouseEnter('Form Services')} onMouseLeave={handleMouseLeave}>Form Services</a>
                                    {showDialog && service === 'Form Services' && (
                                        <div className="dialogBox">Our form service enables the creation of customized forms to gather responses from multiple users.</div>
                                    )}
                                </li>
                                <li>
                                    <a href="/excel-xlsx-service" onMouseEnter={() => handleMouseEnter('Excel File Services')} onMouseLeave={handleMouseLeave}>Excel File Services</a>
                                    {showDialog && service === 'Excel File Services' && (
                                        <div className="dialogBox">Our Excel service offers versatile data manipulation and conversion to PDFs.</div>
                                    )}
                                </li>
                                <li>
                                    <a href="/email-flooding-service" onMouseEnter={() => handleMouseEnter('Mail Services')} onMouseLeave={handleMouseLeave}>Mail Services</a>
                                    {showDialog && service === 'Mail Services' && (
                                        <div className="dialogBox">Our email service allows for efficient sending of emails to multiple recipients with attachments.</div>
                                    )}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div id='profileTag'>
                    <button onClick={handleLogout}>LogOut</button> {/* Change <a> to <button> and add onClick event */}
                </div>
            </nav>
            <div id="welcomeMessage">
                Welcome {localStorage.getItem("username")} back to FileVista! We're thrilled to have you here. Your journey to streamlined user drive management starts now. Whether you're managing emails, manipulating Excel files, storing important documents, or generating PDFs, we're here to make your experience seamless and productive. If you have any questions or need assistance, our team is always here to help. Let's make managing your digital assets a breeze together. Welcome aboard!
                <br></br><br></br>
                Ready to experience the convenience of FileVista's user drive management services firsthand? This is a free trial to unlock a world of streamlined workflows and enhanced productivity. Whether you're sending multiple emails with attachments, manipulating Excel files effortlessly, securely storing various file types, or generating PDFs with ease, FileVista has everything you need to simplify your digital tasks. Join us today and discover the future of user drive management!
             </div>
            
        </div>
    );
}
