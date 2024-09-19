// src/components/FloatingIcons.js
import React from 'react';
import { useState } from 'react';
import { FaWhatsapp, FaYoutube, FaPhoneAlt } from 'react-icons/fa';
import './FloatingIcons.css';
import { Modal } from 'react-bootstrap';
import { addUserRequirement } from "../services/UserRequirements.service";
import { toastError, toastSuccess } from "../utils/toastutill";
import { errorToast, successToast } from "./Utility/Toast";
import { useDispatch, useSelector } from "react-redux";

const Movingicon = () => {
    const auth = useSelector((state) => state.auth);

    const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [productName, setProductName] = useState("");
    const handleConnectNow = async (id) => {
        setModalOpen(true);
    };
    const handleSubmitRequirement = async (e) => {
        try {
            if (name == "") {
                throw new Error("Name cannot be empty");
                return;
            }
            if (phone == "") {
                throw new Error("Mobile number cannot be empty");
                return;
            }
            if (address == "") {
                throw new Error("Address cannot be empty");
                return;
            }
            if (productName == "") {
                throw new Error("Product cannot be empty");
                return;
            }

            e.preventDefault();
            let obj = {
                name,
                phone,
                address,
                productName,
                userId: auth?._id,
            };
            let { data: res } = await addUserRequirement(obj);
            if (res.message) {
                toastSuccess(res.message);
                setModalOpen(false);
            }
        } catch (err) {
            errorToast(err);
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

            <Modal show={modalOpen} size="lg" centered onHide={() => setModalOpen(false)}>
                <Modal.Body className="review-modal custom-modal subscription-card-container">
                    <button type="button" class="btn-close right" aria-label="Close" onClick={() => setModalOpen(false)}></button>
                    <h3 className="heading yellow">Quick Enquiry</h3>
                    <form className="form row">
                        <div className="col-12">
                            <label>Name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" />
                        </div>
                        <div className="col-12">
                            <label>Mobile No.</label>
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" className="form-control" />
                        </div>
                        <div className="col-12">
                            <label>Address</label>
                            <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" className="form-control" />
                        </div>
                        <div className="col-12">
                            <label>Product / Service</label>
                            <input value={productName} onChange={(e) => setProductName(e.target.value)} type="text" className="form-control" />
                        </div>
                        <div className="col-12">
                            <button className="btn btn-custom btn-yellow mt-2" onClick={(e) => handleSubmitRequirement(e)}>
                                Submit
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};


export default Movingicon
