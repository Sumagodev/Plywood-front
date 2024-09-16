import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getCityByStateApi, getCountriesApi, getStateByCountryApi } from "../../services/location.service";
import { ROLES_CONSTANT } from ".././Utility/constant";
import {
    getAllProducts,

} from "../../services/Product.service";
import { AiFillCheckCircle, AiOutlineInfoCircle } from "react-icons/ai";
import Modal from 'react-bootstrap/Modal';
import { getCroppedImg, handleOpenImageInNewTab } from "../../utils/image.utils";
import Cropper from 'react-easy-crop';
import FileInput from "../Utility/FileUploadCropper";
import { convertFileToBase64 } from ".././Utility/FileConverterToBase64";
import { Applydealership } from '../../services/AddDealership.service';
import { addBrandApi, getBrandApi } from "../../services/brand.service";
import { errorToast, successToast } from "../Utility/Toast";

const ApplyDealership = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { opportunity } = location.state || {};
    console.log(opportunity)
    const [brandName, setBrandName] = useState("");
    const [productArr, setProductArr] = useState([]);

    const userObj = useSelector((state) => state.auth.user);
    console.log(userObj)
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [email, setEmail] = useState("");
    const [type, setType] = useState(ROLES_CONSTANT.MANUFACTURER);
    const [companyName, setCompanyName] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [countryArr, setCountryArr] = useState([]);
    const [stateArr, setStateArr] = useState([]);
    const [cityArr, setCityArr] = useState(opportunity.cities);
    const [countryId, setCountryId] = useState("");
    const [stateId, setStateId] = useState("");
    const [brandNames, setBrandNames] = useState("");
    const [show, setShow] = useState(false);
    const [croppedProfilePhoto, setCroppedProfilePhoto] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [organisationName, setOrganisationName] = useState("");
    const [productId, setProductId] = useState("66cd61a7e79633780724926d"); // Sample Product ID
    const [cityId, setCityId] = useState([]); // Array of city IDs

    const [open, setOpen] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleOpen = () => setOpen(true);
    const handleProfileModalClose = () => setShowProfileModal(false);
    const onCropChange = (newCrop) => setCroppedProfilePhoto(newCrop);
    const onZoomChange = (newZoom) => setZoom(newZoom);
    const handleGetProducts = async () => {
        try {
            let query = `page=${1}&perPage=${10000}&userId=${userObj?._id}`;
            let { data: res } = await getAllProducts(query);
            if (res.data) {
                setProductArr(res.data);
            }
        } catch (err) {
            errorToast(err);
        }
    };

    const handleGetCountries = async () => {
        try {
            const { data: res } = await getCountriesApi();
            if (res.data) {
                setCountryArr(res.data);
            }
        } catch (error) {
            console.error("Error fetching countries", error);
        }
    };

    useEffect(() => {
        handleGetCountries();
        handleGetBrands();
        handleGetProducts();

    }, []);

    const handleGetStates = async (countryId) => {
        try {
            const { data: res } = await getStateByCountryApi(`countryId=${countryId}`);
            if (res.data) {
                setStateArr(res.data);
            } else {
                setStateArr([]);
            }
        } catch (error) {
            console.error("Error fetching states", error);
        }
    };

    useEffect(() => {
        if (countryId) {
            handleGetStates(countryId);
        }
    }, [countryId]);

    const handleGetCities = async (stateId) => {
        try {

            setCityArr(opportunity.cities);

        } catch (error) {
            console.error("Error fetching cities", error);
        }
    };

    useEffect(() => {
        if (stateId) {
            handleGetCities(stateId);
        }
    }, [stateId]);
    const [brandArr, setBrandArr] = useState([]);

    const handleGetBrands = async () => {
        try {
            let { data: res } = await getBrandApi("status=true&page=1&perPage=1000");
            if (res.data) {
                setBrandArr(res.data);
            }
        } catch (err) {
            errorToast(err);
        }
    };
    const makeClientCrop = async (crop) => {
        if (profileImage && crop.width && crop.height) {
            const croppedImageUrl = await getCroppedImg(profileImage, crop);
            setProfileImage(croppedImageUrl);
        }
    };

    const handleCropComplete = async (_, croppedAreaPixels) => {
        const croppedImage = await getCroppedImg(profileImage, croppedAreaPixels);
        // Optionally set the cropped image
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ( !cityId.length) {
            alert("Please fill in cities required fields.");
            return;
        }

        const formData = {
            Organisation_name: userObj.name,
            Type: type,
            dealershipOwnerId: opportunity._id,
            Brand: opportunity.Brand,
            Product: opportunity.product,
            userId: userObj._id,
            cityId: cityId,
            stateId: opportunity.stateId
        };

        console.log(formData)
        try {
            const { data: response } = await Applydealership(formData);
            if (response.success) {
                console.log("Form submitted successfully", response);
                setShow(true);
                resetForm();
            }
        } catch (error) {
            console.error("Error submitting form", error);
        }
    };

    const resetForm = () => {
        setOrganisationName('');
        setType(ROLES_CONSTANT.MANUFACTURER);
        setCompanyName('');
        setProfileImage('');
        setCountryId('');
        setStateId('');
        setCityId([]);
        setTermsAccepted(false);
    };

    const handleCloseAndNavigate = () => {
        setShow(false);
        navigate("/?loginTriggered=true");
    };


    return (
        <>
            <div className="register_user topup-subscription-container">
                <div className="container">
                    <div className="row m-3 pt-3">
                        <div className="col-12 col-md-12">
                            <div className="right">
                                <h3 className="heading yellow">Apply for Dealership</h3>

                                <form className="form row" onSubmit={handleSubmit}>
                                    <div className="col-md-6">
                                        <label>Who are you? <span className="text-danger">*</span></label>
                                        <input
                                            type="radio"
                                            name="type"
                                            value={ROLES_CONSTANT.MANUFACTURER}
                                            checked={type === ROLES_CONSTANT.MANUFACTURER}
                                            onChange={(e) => setType(e.target.value)}
                                        />{" "}
                                        <b className="mx-2">{ROLES_CONSTANT.MANUFACTURER}</b>
                                        <input
                                            type="radio"
                                            name="type"
                                            value={ROLES_CONSTANT.DISTRIBUTOR}
                                            checked={type === ROLES_CONSTANT.DISTRIBUTOR}
                                            onChange={(e) => setType(e.target.value)}
                                        />{" "}
                                        <b className="mx-2">DISTRIBUTOR</b>
                                        <input
                                            type="radio"
                                            name="type"
                                            value={ROLES_CONSTANT.DEALER}
                                            checked={type === ROLES_CONSTANT.DEALER}
                                            onChange={(e) => setType(e.target.value)}
                                        />{" "}
                                        <b className="mx-2">DEALER</b>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Name of Organization <span className="text-danger">*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={organisationName}
                                                placeholder={userObj.name}
                                                onChange={(e) => setOrganisationName(e.target.value)}
                                            />
                                        </div>


                                        <div className="col-md-6">
                                            <div className="row d-flex">
                                                <div className="col-4">
                                                    <label>Brand</label>
                                                </div>

                                            </div>

                                            <input
                                                className="form-control"
                                                value={brandNames}
                                                placeholder={opportunity.Brand}
                                                onChange={(e) => setBrandNames(e.target.value)}


                                            />

                                            {/* <ReactSelect onChange={(e) => setbrand(e.value)} options={brandArr && brandArr.length > 0 && brandArr.map(el => ({ label: el.name, value: el._id }))} /> */}

                                            {/* <input
                                    type="tel"
                                    className="form-control"
                                    value={whatsapp}
                                    onChange={(e) => setwhatsapp(e.target.value)}
                                    maxLength="10"
                                /> */}
                                        </div>




                                        <div className="col-md-6">
                                            <label>Your Email Id <span className="text-danger">*</span></label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label>Country <span className="text-danger">*</span></label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="India"
                                                disabled
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label>State <span className="text-danger">*</span></label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                value={opportunity.stateName}
                                                placeholder={opportunity.stateName}
                                                disabled
                                            />
                                           
                                        </div>
                                        <div className="col-md-6">
                                            <label>Cities <span className="text-danger">*</span></label>

                                            <select
                                                className="form-control"
                                                value={cityId}
                                                onChange={(e) => setCityId([...e.target.selectedOptions].map(option => option.value))}
                                            >
                                                <option value="">Select Cities</option>
                                                {cityArr.map((city) => (
                                                    <option key={city.cityId} value={city.cityId}>
                                                        {city.cityName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>


                                       
                                    </div>
                                    <div className="col-12 mt-3">
                                        <button type="submit" className="btn btn-primary">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Submission Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your dealership Application has been submitted successfully.</Modal.Body>
                <Modal.Footer>
                    <button variant="secondary" onClick={handleCloseAndNavigate}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ApplyDealership;
