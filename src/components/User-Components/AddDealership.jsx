import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { getAllCategories } from "../../services/Category.service";
import { getSalesUsers, registerUser } from "../../services/User.service";
import { getCityByStateApi, getCountriesApi, getStateByCountryApi } from "../../services/location.service";
import { toastError } from "../../utils/toastutill";
import FileUpload from ".././Utility/FileUpload";
import { errorToast, successToast } from ".././Utility/Toast";
import { ROLES_CONSTANT } from ".././Utility/constant";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { AiFillCheckCircle, AiFillInfoCircle, AiOutlineInfoCircle } from "react-icons/ai";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getCroppedImg, handleOpenImageInNewTab } from "../../utils/image.utils";
import Cropper from 'react-easy-crop';
import FileInput from "../Utility/FileUploadCropper";
import { convertFileToBase64 } from ".././Utility/FileConverterToBase64";
import {Adddealership} from '../../services/AddDealership.service'
const AddDealership = () => {
    const editorRef = useRef(null);
    const navigate = useNavigate()
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [name, setname] = useState("");
    const [mobile, setmobile] = useState("");
    const [email, setemail] = useState("");
    const [whatsapp, setwhatsapp] = useState("");
    const [type, settype] = useState(ROLES_CONSTANT.MANUFACTURER);
    const [companyName, setcompanyName] = useState("");
    const [companyEmail, setcompanyEmail] = useState("");
    const [companyPhone, setcompanyPhone] = useState("");
    const [gstNumber, setgstNumber] = useState("");
    const [address, setaddress] = useState("");
    const [dob, setdob] = useState("");
    const [noofepmployee, setnoofepmployee] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [signature, setsignature] = useState("");
    const [gstCertificate, setgstCertificate] = useState("");
    const [countryArr, setcountryArr] = useState([]);
    const [stateArr, setstateArr] = useState([]);
    const [cityArr, setcityArr] = useState([]);
    const [countryId, setcountryId] = useState("648d5b79f79a9ff6f10a82fb");

    const [stateId, setstateId] = useState("");
    const [brandNames, setBrandNames] = useState("")
    
    // const [landline, setLandline] = useState("");
    const [aniversaryDate, setAniversaryDate] = useState(new Date());

    const [bannerImage, setBannerImage] = useState("");

    const [salesUsersArr, setSalesUsersArr] = useState([]);

    const [categoryArr, setcategoryArr] = useState([])
    const [category, setcategory] = useState("")
    const [mainCategoryArr, setmainCategoryArr] = useState([])


    const [show, setShow] = useState(false);




    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const [croppedProfilePhoto, setCroppedProfilePhoto] = useState({ x: 0, y: 0 });

    const [zoom, setZoom] = useState(1);
    const [showProfileModal, setShowProfileModal] = useState(false);

    const handleProfileModalClose = () => setShowProfileModal(false);


    const onCropChange = (newCrop) => setCroppedProfilePhoto(newCrop);
    const onZoomChange = (newZoom) => setZoom(newZoom);
    const [organisationName, setOrganisationName] = useState("");
    const [product, setProduct] = useState("66cd61a7e79633780724926d"); // Sample Product ID
    const [brand, setBrand] = useState("");
    const [productId, setProductId] = useState("66cd61a7e79633780724926d"); // Same as product
    const [userId, setUserId] = useState("66cd5f1de796337807248ea4"); // Sample User ID
    const [image, setImage] = useState(""); // Handle image upload
    const [cityId, setcityId] = useState([]); // Array of city IDs
    
    // State management for dropdown options
    const makeClientCrop = async (crop) => {
        console.log(crop, "crop")
        if (profileImage && crop.width && crop.height) {
            const croppedImageUrl = await getCroppedImg(profileImage, crop);
            console.log(croppedImageUrl, "croppedImageUrl")
            setProfileImage(croppedImageUrl);
        }
    };
    const handleCropComplete = async (_, croppedAreaPixels) => {
        const croppedImage = await getCroppedImg(profileImage, croppedAreaPixels);
        // setProfileImage(croppedImage);
    };

    // Fetch states when component mounts
    const handleGetStates = async (countryId) => {
        try {
            let { data: res } = await getStateByCountryApi(`countryId=${countryId}`);
            console.log('API response:', res); // Add this to debug API response
            if (res.data) {
                setstateArr(res.data);
            } else {
                setstateArr([]);
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    // Fetch cities when state changes
    const handleGetCities = async (stateId) => {
        try {
            let { data: res } = await getCityByStateApi(`stateId=${stateId}`);
            if (res.data) {
                setcityArr(res.data);
            } else {
                setcityArr([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Handle state change (fetch cities on state change)
    useEffect(() => {
        if (stateId) {
            handleGetCities(stateId);
        }
    }, [stateId]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the form data
        const formData = {
            Organisation_name: organisationName,
            Type: type,
            Product: product,
            Brand: brand,
            productId: productId,
            userId: userId,
            image: image,
            cityId: cityId, // Array of city IDs
            stateId: stateId
        };

        // Send form data to the server
        try {
            const { data: response } = await Adddealership(formData);
            if (response.success) {
                console.log("Form submitted successfully", response);
                // Handle success (e.g., show success message, navigate to another page)
            }
        } catch (error) {
            console.error("Error submitting form", error);
        }
    };

    return (
        <>
            <div className="regsiter_user topup-subscription-container ">
                <div className="container">
                    <div className="row m-3 pt-3">
                        <div className="col-12 col-md-12">
                            <div className="right">
                                <h3 className="heading yellow">Register</h3>

                                <form className="form row ">
                                    <div className="col-md-6">
                                        <label>Who are you ? <span className="text-danger">*</span>  </label>
                                        <input
                                            type="radio"
                                            name="type"
                                            value={ROLES_CONSTANT.MANUFACTURER}
                                            checked={type === ROLES_CONSTANT.MANUFACTURER}
                                            onChange={(e) => settype(e.target.value)}

                                        />{" "}
                                        <b className="mx-2">{ROLES_CONSTANT.MANUFACTURER}</b>
                                        <input
                                            type="radio"
                                            name="type"
                                            value={ROLES_CONSTANT.DISTRIBUTOR}
                                            checked={type === ROLES_CONSTANT.DISTRIBUTOR}
                                            onChange={(e) => settype(e.target.value)}
                                        />{" "}
                                        <b className="mx-2">DISTRIBUTOR</b>
                                        <input
                                            type="radio"
                                            name="type"
                                            value={ROLES_CONSTANT.DEALER}
                                            checked={type === ROLES_CONSTANT.DEALER}
                                            onChange={(e) => settype(e.target.value)}
                                        />{" "}
                                        <b className="mx-2">DEALER</b>
                                    </div>


                                    <div className="row">
                                        {/* <h4 className="heading yellow">Company Details </h4> */}

                                        <div className="col-md-6">
                                            <label>Name of Organization <span className="text-danger">*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={companyName}
                                                onChange={(e) => setcompanyName(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label> Dealing With Brand Names  </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={brandNames}
                                                onChange={(e) => setBrandNames(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label> image </label>
                                            <div onClick={() => handleOpenImageInNewTab(profileImage)}>
                                                <img src={profileImage} style={{ width: 150, height: 150 }} alt="" />
                                            </div>
                                            <FileInput setFile={async (e) => {
                                                let base64 = await convertFileToBase64(e);
                                                setProfileImage(base64)
                                            }} file={profileImage} type="image" previousFile={(profileImage && profileImage != "" && profileImage.includes("base64")) ? profileImage : null} />
                                            {/* <FileUpload onFileChange={(val) => { setProfileImage(val); }} /> */}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <label>Your Email Id <span className="text-danger">*</span></label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setemail(e.target.value)}

                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label> State <span className="text-danger">*</span></label>
                                        {
                                            stateArr && (
                                                <select className="form-control" onChange={(e) => setstateId(e.target.value)}>
                                                    <option value="">Please Select State</option>
                                                    {stateArr.map((state) => (
                                                        <option value={state._id} >{state.name}</option>
                                                    ))}
                                                </select>
                                            )
                                        }
                                    </div>
                                    <div className="col-md-6">
                                        <label> Cities <span className="text-danger">*</span></label>
                                        {
                                            cityArr && (
                                                <select className="form-control" onChange={(e) => setcityId(e.target.value)}>
                                                    <option value="">Please Select City</option>
                                                    {cityArr.map((city) => (
                                                        <option value={city._id} >{city.name}</option>
                                                    ))}
                                                </select>
                                            )
                                        }
                                    </div>
                                    <div className="col-md-12 ">
                                        <div className="mobilebootm">
                                            <input onChange={(e) => { console.log(e.target.value, e.target.checked); setTermsAccepted(e.target.checked) }} checked={termsAccepted} value={termsAccepted} className="check" type="checkbox" /> Please Accept our <Link
                                                to="/Terms">terms and condition</Link> and <Link
                                                    to="/Privacy">privacy policy</Link> before registering
                                        </div>
                                        <button type="button" onClick={() => { handleSubmit() }} className="btn btn-custom btn-yellow mt-5">
                                            add dealership oprtunity
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body style={{ display: "grid", placeItems: "center", padding: "0px 30px" }}>
                    <AiFillCheckCircle style={{ color: "black", fontSize: 80, alignSelf: "center" }} />
                    <h2><b>Registered Successfully!</b></h2>
                    <p style={{ color: "black", textAlign: "center", marginTop: 20 }}>Your profile will be tagged as <b>Verified</b> once our internal team verifies it.</p>
                    <p style={{ color: "black", textAlign: "center" }}>You can Log In using your Email ID or Mobile Number</p>
                    <button className="btn btn-custom btn-yellow mt-2 mb-4" onClick={() => navigate("/?loginTriggered=true")}>
                        Login
                    </button>
                </Modal.Body>
            </Modal>
            <Modal show={showProfileModal} onHide={handleProfileModalClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body style={{ display: "grid", placeItems: "center", padding: "0px 30px" }}>


                    <Cropper
                        image={profileImage}
                        crop={croppedProfilePhoto}
                        zoom={zoom}
                        // aspect={4 / 3} // You can adjust the aspect ratio as needed
                        onCropChange={onCropChange}
                        onZoomChange={onZoomChange}
                        onCropComplete={handleCropComplete}
                    />



                    <button className="btn btn-custom btn-yellow mt-2 mb-4" onClick={() => { handleProfileModalClose(); makeClientCrop(croppedProfilePhoto) }}>
                        Save
                    </button>
                </Modal.Body>
            </Modal>
        </>
    );
};



export default AddDealership
