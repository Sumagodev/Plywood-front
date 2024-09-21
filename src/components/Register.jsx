import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { getAllCategories } from "../services/Category.service";
import { getSalesUsers, registerUser } from "../services/User.service";
import { getCityByStateApi, getCountriesApi, getStateByCountryApi } from "../services/location.service";
import { toastError } from "../utils/toastutill";
import FileUpload from "./Utility/FileUpload";
import { errorToast, successToast } from "./Utility/Toast";
import { ROLES_CONSTANT } from "./Utility/constant";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { AiFillCheckCircle, AiFillInfoCircle, AiOutlineInfoCircle } from "react-icons/ai";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getCroppedImg, handleOpenImageInNewTab } from "../utils/image.utils";
import Cropper from 'react-easy-crop';
import FileInput from "./Utility/FileUploadCropper";
import { convertFileToBase64 } from "./Utility/FileConverterToBase64";

export const Register = () => {
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
    const [countryId, setcountryId] = useState("");
    const [stateId, setstateId] = useState("");
    const [cityId, setcityId] = useState("");
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
    const handleProfileModalShow = () => setShowProfileModal(true);




    const [croppedBannerPhoto, setCroppedBannerPhoto] = useState("");


    const [showBannerModal, setShowBannerModal] = useState(false);

    const handleBannerModalClose = () => setShowBannerModal(false);
    const handleBannerModalShow = () => setShowBannerModal(true);




    ///////new Fields///////
    const [natureOfBusiness, setNatureOfBusiness] = useState();
    const [annualTurnover, setAnnualTurnover] = useState();
    const [iecCode, setIecCode] = useState();
    const [yearOfEstablishment, setYearOfEstablishment] = useState();
    const [legalStatus, setLegalStatus] = useState();
    const [cinNo, setCinNo] = useState();
    const [companyCeo, setCompanyCeo] = useState();
    const [googleMapsLink, setGoogleMapsLink] = useState();
    const [salesObj, setSalesObj] = useState(null);


    const onCropChange = (newCrop) => setCroppedProfilePhoto(newCrop);
    const onZoomChange = (newZoom) => setZoom(newZoom);


    const handleRegister = async () => {
        // console.log(category, "check cate")

        if (`${companyName}` === "") {
            errorToast("Organization Name is Required");
            return 0;
        }
        if (`${yearOfEstablishment}` === "") {
            errorToast("Year of Establishment is Required");
            return 0;
        };
        if (!category) {
            errorToast("category is Required");
            return 0;
        };
        if (`${address}` === "") {
            errorToast("Address is Required");
            return 0;
        };



        if (`${name}` === "") {
            errorToast("Name is Required");
            return;
        }
        if (`${email}` === "") {
            errorToast("email is Required");
            return 0;
        }


        if (`${mobile}` === "") {
            errorToast("Mobile is Required");
            return 0;
        }
        // if (`${whatsapp}` === "") {
        //     errorToast("Enter Your Whatsapp Number");
        //     return 0;
        // }





        // if (`${companyEmail}` === "") {
        //     errorToast("Organization Email is Required");
        //     return 0;
        // }
        // if (`${companyPhone}` === "") {
        //     errorToast("Organization Phone is Required");
        //     return 0
        // }
        // if (`${gstNumber}` === "") {
        //     errorToast("Gst is Required");
        //     return 0;
        // };

        if (`${countryId}` === "") {
            errorToast("Country is Required");
            return 0;
        };
        if (`${stateId}` === "") {
            errorToast("State is Required");
            return 0;
        };
        if (`${cityId}` === "") {
            errorToast("City is Required");
            return 0;
        };

        if (!termsAccepted) {
            errorToast("Please Accept our terms and condition and privacy policy before registering !!!");
            return
        }
        let obj = {
            name,
            email,
            phone: mobile,
            address,
            brandNames,
            whatsapp,
            dob,
            role: type,
            gstNumber,
            countryId,
            stateId,
            cityId,
            aniversaryDate,
            // landline,
            approved: true,
            categoryArr: category.map(el => ({ categoryId: el.value })),

            companyObj: {
                name: companyName,
                email: companyEmail,
                phone: companyPhone,
                address,
                gstNumber,
                noofepmployee,
                natureOfBusiness,
                annualTurnover,
                iecCode,
                yearOfEstablishment,
                legalStatus,
                cinNo,
                // companyCeo,
                // googleMapsLink,
            },
            gstCertificate,
            bannerImage,
            profileImage
        }

        if (salesObj && salesObj?._id) {
            obj.salesId = salesObj?._id
        }

        console.log(obj, "companycompanycompanycompany")
        try {
            let { data: res } = await registerUser(obj)
            if (res.data) {
                // successToast(res.message);
                navigate("/Thankyou")
                // handleShow()
                // window.location.reload();
            }
        } catch (error) {
            console.error(error)
            errorToast(error)
        }
    }

    const handleGetCoutries = async () => {
        try {
            let { data: res } = await getCountriesApi();
            console.log(res.data, "data")
            if (res.data) {
                setcountryArr(res.data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleNestedCategory = async () => {
        try {
            const { data: res } = await getAllCategories()
            if (res.success && res.data.length) {
                setcategoryArr(res.data)
            }

        } catch (error) {
            console.error(error)
            toastError(error)
        }
    }



    const getAllSalesUsers = async () => {
        try {
            const { data: res } = await getSalesUsers();
            if (res) {
                setSalesUsersArr(res.data)
            }
        } catch (error) {
            toastError(error)
        }
    }

    const handleGetStates = async (countryId) => {
        try {
            let { data: res } = await getStateByCountryApi(`countryId=${countryId}`);
            if (res.data) {
                setstateArr(res.data);
            } else {
                setstateArr([])
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetCities = async (stateId) => {
        try {
            let { data: res } = await getCityByStateApi(`stateId=${stateId}`);
            if (res.data) {
                setcityArr(res.data);
            } else {
                setcityArr([])
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleGetCoutries()
        handleNestedCategory()
        getAllSalesUsers()
    }, [])
    useEffect(() => {
        if (countryId) {
            console.log(countryId, "countryId")
            handleGetStates(countryId)
        }
    }, [countryId])

    useEffect(() => {
        if (stateId) {
            handleGetCities(stateId)
        }
    }, [stateId])


    const tooltip = (
        <Tooltip id="tooltip">
            <strong>Product Categories interested in</strong> You can select multiple categories if you want.
        </Tooltip>
    );


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


    return (
        <>
            <div className="regsiter_user topup-subscription-container ">
                <div className="container">
                    <div className="row m-3 pt-3">
                        <div className="col-12 col-md-12">
                            <div className="right">
                                <h3 className="heading yellow">Register</h3>

                                <form className="form row ">
                                

                                    <div className="col-md-9">
                                        <label>Who are you ? <span className="text-danger">*</span>  </label>
                                        <input
                                            type="radio"
                                            name="type"
                                            value={ROLES_CONSTANT.CONTRACTOR}
                                            checked={type === ROLES_CONSTANT.CONTRACTOR}
                                            onChange={(e) => settype(e.target.value)}
                                        />{" "}
                                        <b className="mx-2">CONTRACTOR</b>


                                        <input
                                            type="radio"
                                            name="type"
                                            value={ROLES_CONSTANT.RETAILER}
                                            checked={type === ROLES_CONSTANT.RETAILER}
                                            onChange={(e) => settype(e.target.value)}
                                        />{" "}
                                        <b className="mx-2">RETAILER</b>
                                        <input
                                            type="radio"
                                            name="type"
                                            value={ROLES_CONSTANT.DEALER}
                                            checked={type === ROLES_CONSTANT.DEALER}
                                            onChange={(e) => settype(e.target.value)}
                                        />{" "}
                                        <b className="mx-2">DEALER</b>
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

                                            value={ROLES_CONSTANT.MANUFACTURER}
                                            checked={type === ROLES_CONSTANT.MANUFACTURER}
                                            onChange={(e) => settype(e.target.value)}

                                        />{" "}
                                        <b className="mx-2">{ROLES_CONSTANT.MANUFACTURER}</b>
                                    </div>


                                    <div className="row">
                                        {/* <h4 className="heading yellow">Company Details </h4> */}

                                        <div className="col-md-6">
                                            <label>Business Name <span className="text-danger">*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Please Enter Business Name"
                                                value={companyName}
                                                onChange={(e) => setcompanyName(e.target.value)}
                                            />
                                        </div>
                                        {/* <div className="col-md-6">
                                            <label>Organization Email <span className="text-danger">*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={companyEmail}
                                                onChange={(e) => setcompanyEmail(e.target.value)}
                                            />
                                        </div> */}
                                        {/* <div className="col-md-6">
                                            <label>Organization Phone / Landline</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={companyPhone}
                                                onChange={(e) => setcompanyPhone(e.target.value)}
                                                maxLength="10"
                                            />
                                        </div>
                                         */}
                                        {/* <div className="col-md-6">
                                            <label>Landline Number <span className="text-danger">*</span> </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={landline}
                                                onChange={(e) => setLandline(e.target.value)}
                                            />
                                        </div> */}

                                        <div className="col-md-6">
                                            <label> Year of Establishment <span className="text-danger">*</span> </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Please Enter Year of Establishment"
                                                value={yearOfEstablishment}
                                                onChange={(e) => setYearOfEstablishment(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <div style={{ width: "max-content" }} >
                                                <OverlayTrigger placement="right" overlay={tooltip}>
                                                    <label>Category<span className="text-danger me-2">*</span>
                                                        <AiOutlineInfoCircle />
                                                    </label>
                                                </OverlayTrigger>
                                            </div>
                                            <Select className='form-control abc bg-transperant' 
                                                options={categoryArr && categoryArr.length > 0 && categoryArr.map((el) => ({ ...el, label: el.name, value: el._id }))}
                                                value={category} closeMenuOnSelect={false} onChange={(e) => setcategory(e)} isMulti />


                                        </div>

                                        <div className="col-md-6">
                                            <label> Dealing With Brand Names  </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Please Enter Brand Names"

                                                value={brandNames}
                                                onChange={(e) => setBrandNames(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label> GST No </label>
                                            <input
                                                type="text"
                                                placeholder="Please Enter GST No"

                                                className="form-control"
                                                value={gstNumber}
                                                onChange={(e) => setgstNumber(e.target.value)}
                                            />
                                        </div>
                                        {/* <div className="col-md-6">
                                            <label> Google Maps Link <span className="text-danger">*</span> </label>
                                            <a href="https://www.google.com/maps" target="_blank" style={{ textDecorationLine: "underline" }}> Click to open google maps</a>
                                            <br />
                                            <br />
                                            <span>Note : The link above will take you to google maps where you can select the your business's location to get the link and paste it in the text input given below</span>
                                            <br />
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={googleMapsLink}
                                                onChange={(e) => setGoogleMapsLink(e.target.value)}
                                            />
                                        </div> */}

                                        <div className="col-md-6">
                                            <label> Country <span className="text-danger">*</span></label>
                                            {
                                                countryArr && (
                                                    <select className="form-control" onChange={(e) => setcountryId(e.target.value)}>
                                                        <option value="">Please Select Country</option>
                                                        {countryArr.map((country) => (
                                                            <option value={country._id} >{country.name}</option>
                                                        ))}
                                                    </select>
                                                )
                                            }
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
                                            <label> City <span className="text-danger">*</span></label>
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
                                        <div className="col-md-12">
                                            <label> Address <span className="text-danger">*</span></label>
                                            <textarea
                                                className="form-control"
                                                placeholder="Please Enter Address"

                                                value={address}
                                                onChange={(e) => setaddress(e.target.value)}
                                                rows={3}
                                            ></textarea>
                                        </div>








                                        <div className="col-md-6">
                                            <label> Profile Photo</label>
                                            <div onClick={() => handleOpenImageInNewTab(profileImage)}>
                                                <img src={profileImage} style={{ width: 150, height: 150 }} alt="" />
                                            </div>
                                            <FileInput setFile={async (e) => {
                                                let base64 = await convertFileToBase64(e);
                                                setProfileImage(base64)
                                            }} file={profileImage} type="image" previousFile={(profileImage && profileImage != "" && profileImage.includes("base64")) ? profileImage : null} />
                                            {/* <FileUpload onFileChange={(val) => { setProfileImage(val); }} /> */}
                                        </div>


                                        <div className="col-md-6">
                                            <label> Banner Photo  (Exterior/Interior Image of your Showroom/Unit)</label>
                                            <div onClick={() => handleOpenImageInNewTab(bannerImage)}>
                                                <img src={bannerImage} style={{ width: 150, height: 150 }} alt="" />
                                            </div>
                                            <FileInput setFile={async (e) => {
                                                let base64 = await convertFileToBase64(e);
                                                setBannerImage(base64)
                                            }} file={bannerImage} type="image" previousFile={(bannerImage && bannerImage != "" && bannerImage.includes("base64")) ? bannerImage : null} />
                                            {/* <FileUpload onFileChange={(val) => setBannerImage(val)} /> */}
                                        </div>
                                        {/* <div className="col-md-6">
                                            <label> Discription of business</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={natureOfBusiness}
                                                onChange={(e) => setNatureOfBusiness(e.target.value)}
                                            />
                                        </div> */}


                                        {/* <div className="col-md-6">
                                            <label>Select Sales Person</label>
                                            <Select className='form-control' options={salesUsersArr && salesUsersArr.length > 0 && salesUsersArr.map((el) => ({ ...el, label: el.name, value: el._id }))} value={salesObj} onChange={(e) => setSalesObj(e)} />

                                        </div> */}















                                        {/* <div className="col-md-6">
                                            <label> Nature of your business</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={natureOfBusiness}
                                                onChange={(e) => setNatureOfBusiness(e.target.value)}
                                            />
                                        </div> */}

                                    </div>
                                    <h4 className="heading yellow mt-4"> Contact Person Details</h4>
                                    <div className="col-md-6">
                                        <label>Name of Authorised person<span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Please Enter person Name"

                                            value={name}
                                            onChange={(e) => setname(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Date of Birth </label>
                                        <input
                                            type="date"
                                            placeholder="Please Enter Date of Birth"

                                            className="form-control"
                                            value={moment(aniversaryDate).format("YYYY-MM-DD")}
                                            onChange={(e) => setAniversaryDate(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Your Email Id <span className="text-danger">*</span></label>
                                        <input
                                            type="email"
                                            placeholder="Please Enter Your Email Id"

                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setemail(e.target.value)}

                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label>Mobile No. <span className="text-danger">*</span></label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            placeholder="Please Enter Mobile No."

                                            value={mobile}
                                            onChange={(e) => setmobile(e.target.value)}
                                            maxLength="10"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Whatsapp No. </label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            placeholder="Please Enter Whatsapp No."

                                            value={whatsapp}
                                            onChange={(e) => setwhatsapp(e.target.value)}
                                            maxLength="10"
                                        />
                                    </div>









                                    {/* <div className="col-md-6">
                                            <label> Google Maps Link</label>
                                            <a href="https://www.google.com/maps" target="_blank" style={{ textDecorationLine: "underline" }}> Click to open google maps</a>
                                            <br />
                                            <br />
                                            <span>Note : The link above will take you to google maps where you can select the your business's location to get the link and paste it in the text input given below</span>
                                            <br />
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={googleMapsLink}
                                                onChange={(e) => setGoogleMapsLink(e.target.value)}
                                            />
                                        </div> */}







                                    <div className="col-md-12 mt-3">
                                        <div className="mobilebootm">
                                            <input onChange={(e) => { console.log(e.target.value, e.target.checked); setTermsAccepted(e.target.checked) }} checked={termsAccepted} value={termsAccepted} className="check" type="checkbox" /> Please Accept our <Link
                                                to="/Terms">terms and condition</Link> and <Link
                                                    to="/Privacy">privacy policy</Link> before registering
                                        </div>
                                        <button type="button" onClick={() => { handleRegister() }} className="btn btn-custom btn-yellow my-3">
                                            Register
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


// const subcategoryRender = (cateArr, dash) => {
//     dash += '-    '
//     console.log(cateArr.length)
//     return (
//         cateArr && cateArr.length > 0 && cateArr.map((cat) => {
//             return (
//                 <>
//                     <option key={cat._id} value={cat._id}>{dash}{cat.name}</option>
//                     {subcategoryRender(cat.subCategoryArr, dash)}
//                 </>

//             )
//         })
//     )
// }