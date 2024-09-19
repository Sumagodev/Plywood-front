// src/components/FloatingIcons.js
import React from 'react';
import { useState, useEffect } from 'react';
import { FaWhatsapp, FaYoutube, FaPhoneAlt } from 'react-icons/fa';
import './FloatingIcons.css';
import axios from 'axios';

const Movingicon = () => {
    const [socialLinks, setSocialLinks] = useState({});
    console.log("socialLinks", socialLinks);

    useEffect(() => {
        // Fetching social media links
        axios
            .get("/social-contact/get-socialcontacts")
            .then((response) => {
                setSocialLinks(response.data.responseData[0]);
            })
            .catch((error) => {
                console.error("There was an error fetching the social media links!", error);
            });
    }, []);
    return (
        <div className="floating-icons">
            {/* .in */}

            {socialLinks && (<a href={`https://wa.me/9403574184`} className="iconz whatsapp" rel="noopener noreferrer">
                <FaWhatsapp className="iconz whatsapp" />
            </a>)}

            {/* .ae */}
            {/* <a href="https://wa.me/7385559882" className="iconz whatsapp" rel="noopener noreferrer">
                <FaWhatsapp className="iconz whatsapp" />
            </a> */}

        </div>
    );
};


export default Movingicon
