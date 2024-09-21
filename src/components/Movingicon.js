// src/components/FloatingIcons.js
import React from 'react';
import { useState } from 'react';
import { FaWhatsapp, FaYoutube, FaPhoneAlt } from 'react-icons/fa';
import './FloatingIcons.css';
import { Modal } from 'react-bootstrap';
import { addquickenquiry } from "../services/UserRequirements.service";
import { toastError, toastSuccess } from "../utils/toastutill";
import { errorToast, successToast } from "./Utility/Toast";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/image/home/images/logo6.png";
const Movingicon = () => {

    const [modalOpen, setModalOpen] = useState(false);

    const [modalOpen1, setModalOpen1] = useState(false);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [meassage, setmeassage] = useState("");
    const handleConnectNow = async (id) => {
        setModalOpen(true);
    };
    const handleSubmitRequirement = async (e) => {
        e.preventDefault();  // Add this to prevent form's default submission behavior
        try {
            if (name === "") {
                throw new Error("Name cannot be empty");
            }
            if (phone === "") {
                throw new Error("Mobile number cannot be empty");
            }

            let obj = { name, phone, meassage };
            let { data: res } = await addquickenquiry(obj);
            if (res.message) {
                setModalOpen1(true);
                setModalOpen(false);
                setName("");
                setPhone("");
                setmeassage("");
            }
        } catch (err) {
            errorToast(err.message);
        }
    };

    return (
        <>
            <div className="floating-icons d-grid">


                <div>
                    <a href={`https://wa.me/9403574184`} className="  d-flex justify-content-end" rel="noopener noreferrer">
                        <FaWhatsapp className="iconz whatsapp" />
                    </a>
                </div>

                <div className="quick-enquiry">
                    <a href="#enquiry-form" className="quick-enquiry-text" rel="noopener noreferrer" onClick={() => handleConnectNow()}>
                        Quick Enquiry
                    </a>
                </div>


            </div>

            <Modal show={modalOpen} centered onHide={() => setModalOpen(false)}>
                <Modal.Body className="review-modal custom-modal subscription-card-container ">
                    <button type="button" class="btn-close right" aria-label="Close" onClick={() => setModalOpen(false)}></button>
                    <img src={logo} className='img-fluid p-5' />
                    <h3 className="heading yellow d-flex justify-content-center">Quick Enquiry</h3>
                    <form className="form row">
                        <div className="col-12">
                            <label>Name</label>
                            <input value={name}
                                placeholder='Enter Your Name'
                                onChange={(e) => setName(e.target.value)} type="text" className="form-control" />
                        </div>

                        <div className="col-12">
                            <label>Mobile No.</label>
                            <input
                                value={phone}
                                onChange={(e) => {
                                    if (e.target.value.length <= 10) {
                                        setPhone(e.target.value); // Update phone only if it's 10 digits or less
                                    }
                                }}
                                type="tel"
                                className="form-control"
                                placeholder='Enter Your Mobile No'
                            // Disable input if 10 digits are entered
                            />
                        </div>
                        <div className="col-12">
                            <label>Business Name</label>
                            <input
                                placeholder='Enter Your Business Name'

                                value={meassage} onChange={(e) => setmeassage(e.target.value)} type="text" className="form-control" />
                        </div>

                        <div className="col-12 d-flex justify-content-center">
                            <button className="btn btn-custom btn-yellow mt-2" onClick={(e) => handleSubmitRequirement(e)}>
                                Submit
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            <Modal show={modalOpen1} centered onHide={() => setModalOpen1(false)}>
                <Modal.Body className="review-modal custom-modal subscription-card-container ">
                    <button type="button" class="btn-close right" aria-label="Close" onClick={() => setModalOpen1(false)}></button>
                    <img src={logo} className='img-fluid p-5' />
                    <h3 className="heading yellow d-flex justify-content-center">Thank you</h3>
                    <h5 className=" d-flex justify-content-center">Will connect with you soon</h5>

                </Modal.Body>
            </Modal>
        </>
    );
};


export default Movingicon
