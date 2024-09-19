import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
import { Adddealership } from '../../services/AddDealership.service';
import { addBrandApi, getBrandApi } from "../../services/brand.service";
import { errorToast, successToast } from "../Utility/Toast";

const AddDealership = () => {
    const navigate = useNavigate();
    const [brandName, setBrandName] = useState("");
    const [productArr, setProductArr] = useState([]);
    const isAuthorized = useSelector((state) => state.auth.isAuthorized);

    const userObj = useSelector((state) => state.auth.user);
    console.log(userObj)
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [email, setEmail] = useState("");
    const [type, setType] = useState(ROLES_CONSTANT.MANUFACTURER);
    const [companyName, setCompanyName] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [countryArr, setCountryArr] = useState([]);
    const [stateArr, setStateArr] = useState([]);
    const [cityArr, setCityArr] = useState([]);
    const [countryId, setCountryId] = useState("");
    const [stateId, setStateId] = useState("");
    const [brandNames, setBrandNames] = useState("");
    const [show, setShow] = useState(false);
    const [croppedProfilePhoto, setCroppedProfilePhoto] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [organisationName, setOrganisationName] = useState("");
    const [productId, setProductId] = useState(""); // Sample Product ID
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
            const { data: res } = await getCityByStateApi(`stateId=${stateId}`);
            if (res.data) {
                setCityArr(res.data);
            } else {
                setCityArr([]);
            }
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
        

        if (!organisationName || !countryId || !stateId || !cityId.length) {
            alert("Please fill in all required fields.");
            return;
        }

        const formData = {
            Organisation_name: organisationName,
            Type: type,
            Brand: brandNames,
            Product: productId,
            userId: userObj._id,
            image: profileImage,
            cityId: cityId,
            stateId: stateId
        };

        console.log(formData)
        try {
            const { data: response } = await Adddealership(formData);
            setShow(true);
            resetForm();
            console.log("Form submitted successfully", response);
          
        } catch (error) {
            console.error("Error submitting form", error);
        }
    };

    const resetForm = () => {
        setOrganisationName('');
        setBrandNames('')
        setProductId('')
        setType(ROLES_CONSTANT.MANUFACTURER);
        setCompanyName('');
        setProfileImage("");
        setCountryId('');
        setStateId('');
        setCityId([]);
        setTermsAccepted(false);
    };

    const handleCloseAndNavigate = () => {
        setShow(false);
        navigate("/?loginTriggered=true");
    };
    const HandleAddBrand = async () => {
        try {
            if (`${brandName}` === "") {
                errorToast("Please Fill Brand Name");
                return 0;
            }

            let obj = {
                name: brandName,
                status: true,
            };

            let { data: res } = await addBrandApi(obj);
            if (res.message) {
                successToast(res.message);
                handleGetBrands();
                handleClose();
            }
        } catch (err) {
            errorToast(err);
        }
    };

    return (
        <>
            <div className="register_user topup-subscription-container">
                <div className="container">
                    <div className="row m-3 pt-3">
                        <div className="col-12 col-md-12">
                            <div className="right">
                                <h3 className="heading yellow">Add Dealership</h3>

                                <form className="form row" >
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
                                                placeholder="Please Enter Your Organization's Name"
                                                onChange={(e) => setOrganisationName(e.target.value)}
                                            />
                                        </div>


                                        <div className="col-md-6">
                                            <div className="row d-flex">
                                                <div className="col-4">
                                                    <label>Brand</label>
                                                </div>

                                            </div>

                                            <select
                                                className="form-control"
                                                value={brandNames}
                                                onChange={(e) => setBrandNames(e.target.value)}
                                            >
                                                <option value="">Please Select Brand</option>
                                                {brandArr &&
                                                    brandArr.length > 0 &&
                                                    brandArr.map((el) => (
                                                        <option value={el.name}>{el.name}</option>
                                                    ))}
                                            </select>
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
                                            <label>
                                                Product <span className="text-danger">*</span>
                                            </label>

                                            <select
                                                className="form-control "
                                                value={productId}
                                                onChange={(e) => {
                                                    setProductId(e.target.value);

                                                }}
                                            >
                                                <option value="">Please Select Product</option>
                                                {productArr &&
                                                    productArr.length > 0 &&
                                                    productArr.map((el) => (
                                                        <option key={el._id} value={`${el._id}`}>
                                                            {el.name}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>

                                        <div className="col-md-6">
                                            <label>Your Email Id <span className="text-danger">*</span></label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Please Enter Your Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label>Country <span className="text-danger">*</span></label>
                                            <select
                                                className="form-control"
                                                value={countryId}
                                                onChange={(e) => {
                                                    setCountryId(e.target.value);
                                                    setStateId("");
                                                    setCityId([]);
                                                }}
                                            >
                                                <option value="">Select Country</option>
                                                {countryArr.map((country) => (
                                                    <option key={country._id} value={country._id}>
                                                        {country.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label>State <span className="text-danger">*</span></label>
                                            <select
                                                className="form-control"
                                                value={stateId}
                                                onChange={(e) => {
                                                    setStateId(e.target.value);
                                                    setCityId([]);
                                                }}
                                            >
                                                <option value="">Select State</option>
                                                {stateArr.map((state) => (
                                                    <option key={state._id} value={state._id}>
                                                        {state.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label>State <span className="text-danger">*</span></label>
                                            <select
                                                className="form-control"
                                                value={cityId}
                                                onChange={(e) => setCityId([...e.target.selectedOptions].map(option => option.value))}
                                            >
                                                <option value="">Select Cities</option>
                                                {cityArr.map((city) => (
                                                    <option key={city._id} value={city._id}>
                                                        {city.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>


                                        <div className="col-md-6">
                                            <label>Image</label>
                                            <div onClick={() => handleOpenImageInNewTab(profileImage)}>
                                                <img src={profileImage} style={{ width: 150, height: 150 }} alt="" />
                                            </div>
                                            <FileInput
                                                setFile={async (e) => {
                                                    let base64 = await convertFileToBase64(e);
                                                    setProfileImage(base64);
                                                }}
                                                file={profileImage}
                                                type="image"
                                                previousFile={(profileImage && profileImage.includes("base64")) ? profileImage : null}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 mt-3 mb-3">
                                        <button type="button" onClick={() => { handleSubmit() }} className="btn btn-custom btn-yellow mt-5">
                                            Register
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal show={show} onHide={handleClose} className="subscription-card-container">
                <Modal.Header closeButton className="subscription-card-container">
                    <Modal.Title>Submission Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body className="subscription-card-container">Your dealership information has been submitted successfully.</Modal.Body>
              
            </Modal>
        </>
    );
};

export default AddDealership;
