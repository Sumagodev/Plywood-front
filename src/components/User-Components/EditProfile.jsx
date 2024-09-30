
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCityByStateApi, getCountriesApi, getStateByCountryApi } from '../../services/location.service';
import { generateImageUrl } from '../../services/url.service';
import { getUserById, updateUserById } from '../../services/User.service';
import { ROLES_CONSTANT } from '../Utility/constant';
import FileUpload from '../Utility/FileUpload';
import { errorToast, successToast } from '../Utility/Toast';
import moment from 'moment';
import { getAllCategories } from '../../services/Category.service';
import { toastError } from '../../utils/toastutill';
import Select from 'react-select';
import FileInput from '../Utility/FileUploadCropper';
import { convertFileToBase64 } from '../Utility/FileConverterToBase64';

export default function EditProfile() {
    let role = useSelector(state => state.auth.role)
    const [whatsapp, setwhatsapp] = useState("");
    const [aniversaryDate, setAniversaryDate] = useState(new Date());
    const [landline, setLandline] = useState("");
    const [brandNames, setBrandNames] = useState("")

    const [categoryOnInit, setCategoryOnInit] = useState([]);
    let id = useSelector(state => state.auth.user._id)
    const [userObj, setUserObj] = useState({});
    const navigate = useNavigate()
    const [email, setemail] = useState("")
    const [name, setName] = useState("");
    const [phone, setphone] = useState("")
    const [password, setpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")
    const [companyName, setcompanyName] = useState("")
    const [companyEmail, setcompanyEmail] = useState("")
    const [companyPhone, setcompanyPhone] = useState("")
    const [gstNumber, setgstNumber] = useState("")
    const [address, setaddress] = useState("")
    const [dob, setdob] = useState("")
    const [noofepmployee, setnoofepmployee] = useState("")
    const [profileImage, setprofileImage] = useState("")
    const [signature, setsignature] = useState("")
    const [gstCertificate, setgstCertificate] = useState("")
    const [countryId, setcountryId] = useState("")
    const [stateId, setstateId] = useState("")
    const [cityId, setcityId] = useState("")
    const [bannerImage, setBannerImage] = useState("");

    const [countryArr, setcountryArr] = useState([])
    const [stateArr, setstateArr] = useState([])
    const [cityArr, setcityArr] = useState([])

    const [categoryArr, setcategoryArr] = useState([])
    const [category, setcategory] = useState("")


    const [imagesArr, setImagesArr] = useState([{ image: "" }]);
    const [videoArr, setVideoArr] = useState([{ video: "" }]);


    ///////new Fields///////
    const [natureOfBusiness, setNatureOfBusiness] = useState();
    const [annualTurnover, setAnnualTurnover] = useState();
    const [iecCode, setIecCode] = useState();
    const [yearOfEstablishment, setYearOfEstablishment] = useState();
    const [legalStatus, setLegalStatus] = useState();
    const [cinNo, setCinNo] = useState();
    const [companyCeo, setCompanyCeo] = useState();
    const [googleMapsLink, setGoogleMapsLink] = useState();
    // const country = useSelector(state => state.countries.countries)
    // const states = useSelector(state => state.states.states) // states
    // const city = useSelector(state => state.cities.cities)


    const handleUpdateUserDetails = async () => {
        try {
            if (`${name}` === "") {
                errorToast("Name is Required");
                return;
            }
            if (`${phone}` === "") {
                errorToast("Mobile is Required");
                return 0;
            }
            // if (`${email}` === "") {
            //     errorToast("Email is Required");
            //     return 0;
            // }
            if (`${userObj?.role}` !== 'USER') {
                if (`${companyName}` === "") {
                    errorToast("Company Name is Required");
                    return 0;
                }

                // if (`${companyEmail}` === "") {
                //     errorToast("Company Email is Required");
                //     return 0;
                // }
                // if (`${companyPhone}` === "") {
                //     errorToast("Company Phone is Required");
                //     return 0
                // }
                if (`${gstNumber}` === "") {
                    errorToast("Gst is Required");
                    return 0;
                };
                if (`${address}setwhatsapp` === "") {
                    errorToast("Address is Required");
                    return 0;
                };
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
                if (`${gstCertificate}` === "") {
                    errorToast("Gst Certificate is Required");
                    return 0;
                };
                // if (`${natureOfBusiness}` === "") {
                //     errorToast("Nature Of Business is Required");
                //     return 0;
                // };
                // if (`${annualTurnover}` === "") {
                //     errorToast("Annual Turnover is Required");
                //     return 0;
                // };
                // if (`${iecCode}` === "") {
                //     errorToast("IEC Code is Required");
                //     return 0;
                // };
                // if (`${yearOfEstablishment}` === "") {
                //     errorToast("Year of Establishment is Required");
                //     return 0;
                // };
                // if (`${legalStatus}` === "") {
                //     errorToast("Legal Status is Required");
                //     return 0;
                // };
                // if (`${cinNo}` === "") {
                //     errorToast("CIN No is Required");
                //     return 0;
                // };
                // if (`${companyCeo}` === "") {
                //     errorToast("Company Ceo Name is Required");
                //     return 0;
                // };
                // if (`${googleMapsLink}` === "") {
                //     errorToast("Google Maps Link Name is Required");
                //     return 0;
                // };

            }
            let obj = {
                name,
                email,
                phone,
                address,
                dob,
                gstNumber,
                countryId,
                stateId,
                brandNames,
                cityId,
                bannerImage,
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
                    companyCeo,
                    googleMapsLink,
                },
                gstCertificate,
                imagesArr,
                whatsapp,
                aniversaryDate,
                videoArr,
                landline,
                profileImage
            }
            let { data: res } = await updateUserById(id, obj)
            if (res.message) {
                successToast(res.message)
                navigate(`/Supplier/${id}`)
                // window.location.reload();
            }
        }
        catch (err) {
            errorToast(err)
        }
    }


    const handleGetCoutries = async () => {
        try {
            let { data: res } = await getCountriesApi();
            if (res.data) {
                setcountryArr(res.data);
            }
        } catch (error) {
            console.log(error)
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
    }, [])
    useEffect(() => {
        if (countryId) {
            handleGetStates(countryId)
        }
    }, [countryId])

    useEffect(() => {
        if (stateId) {
            handleGetCities(stateId)
        }
    }, [stateId])





    const handleGetUser = async () => {
        try {
            let { data: res } = await getUserById(id)
            if (res.data) {
                console.log(res.data, "dataa");
                setUserObj(res.data);
                setemail(res?.data?.email);
                setName(res?.data?.name);
                setphone(res?.data?.phone);
                setpassword(res?.data?.password);
                setBannerImage(res?.data?.bannerImage);
                setconfirmpassword(res?.data?.confirmpassword);
                setcompanyName(res?.data?.companyObj?.name);
                setcompanyEmail(res?.data?.companyObj?.email);
                setBrandNames(res?.data?.brandNames);
                setcompanyPhone(res?.data?.companyObj?.phone);
                setgstNumber(res?.data?.companyObj?.gstNumber);
                setaddress(res?.data?.companyObj?.address);
                setdob(res?.data?.dob);
                setnoofepmployee(res?.data?.companyObj?.noofepmployee);
                setprofileImage(res?.data?.profileImage);
                setsignature(res?.data?.signature);
                setgstCertificate(res?.data?.documents[0]?.image);
                setcountryId(res?.data?.countryId);
                setstateId(res?.data?.stateId);
                setcityId(res?.data?.cityId);
                setNatureOfBusiness(res?.data?.companyObj?.natureOfBusiness);
                setAnnualTurnover(res?.data?.companyObj?.annualTurnover);
                setIecCode(res?.data?.companyObj?.iecCode);
                setYearOfEstablishment(res?.data?.companyObj?.yearOfEstablishment);
                setLegalStatus(res?.data?.companyObj?.legalStatus);
                setCinNo(res?.data?.companyObj?.cinNo);
                setCompanyCeo(res?.data?.companyObj?.companyCeo);
                setGoogleMapsLink(res?.data?.companyObj?.googleMapsLink);
                setImagesArr(res?.data?.imagesArr ? res?.data?.imagesArr : [{ image: "" }]);
                setVideoArr(res?.data?.videoArr ? res?.data?.videoArr : [{ video: "" }]);
                setwhatsapp(res?.data?.whatsapp ? res?.data?.whatsapp : "");
                setAniversaryDate(res?.data?.aniversaryDate ? res?.data?.aniversaryDate : "");
                setLandline(res?.data?.landline ? res?.data?.landline : "");
                setCategoryOnInit(res?.data?.categoryArr ? res?.data?.categoryArr : "");

            }
        }
        catch (err) {
            errorToast(err)
        }
    }

    useEffect(() => {
        if (categoryOnInit) {
            handleNestedCategory()
        }
    }, [categoryOnInit])

    useEffect(() => {

        handleGetUser()

    }, [])


    const handleNestedCategory = async () => {
        try {
            const { data: res } = await getAllCategories()
            if (res.success) {
                setcategoryArr(res.data)

                let temparr = categoryOnInit.map(el => (handleReturnSelectedCategoryObjOnInit(el, res.data)))

                setcategory(temparr);
                console.log(temparr, "temparr")

            }

        } catch (error) {
            console.error(error)
            toastError(error)
        }
    }


    const handleReturnSelectedCategoryObjOnInit = (categoryObj, categoryArr) => {


        let tempCategoryObj = categoryArr.find(ele => ele._id == categoryObj.categoryId)
        if (tempCategoryObj) {
            tempCategoryObj.label = tempCategoryObj.name
            tempCategoryObj.value = tempCategoryObj._id
        }
        else {
            tempCategoryObj = {}
        }

        return tempCategoryObj






    }

    const handleAddImage = () => {
        // alert("asd")
        // let tempArr = imagesArr
        // tempArr.push({ image: "" })
        if (imagesArr && imagesArr.length < 5) {
            setImagesArr([...imagesArr, { image: "" }])
        }
    }

    const handleRemoveImage = () => {
        if ((imagesArr.length) > 0) {
            let tempArr = imagesArr
            tempArr = tempArr.filter((el, index) => index != (tempArr.length - 1))
            setImagesArr([...tempArr])
        }
    }
    const handleSetImage = (index, value) => {
        let tempArr = imagesArr
        tempArr[index].image = value
        setImagesArr([...tempArr])
    }


    const handleAddVideo = () => {
        if (videoArr && videoArr.length < 5) {
            let tempArr = videoArr
            tempArr.push({ video: "" })
            setVideoArr([...tempArr])
        }
    }

    const handleRemoveVideo = () => {
        if ((videoArr.length) > 0) {
            let tempArr = videoArr
            tempArr = tempArr.filter((el, index) => index != (tempArr.length - 1))
            setVideoArr([...tempArr])
        }
    }
    const handleSetVideo = (index, value) => {
        let tempArr = videoArr
        tempArr[index].video = value
        setVideoArr([...tempArr])
    }





    return (
        <div className='container my-5 editprofilemt0'>

            <div className="profile-section-container rounded" style={{ width: "100%" }}>
                <div className="row d-flex justify-content-between">
                    <div className="col-12 pt-2 profile-section-Heading mb-4">Personal Details</div>
                    {/* <div className="col-1">
                        <button type="button" onClick={() => { navigate(`/Edit-Profile?profile=${userObj?._id}`) }} className="btn btn-custom btn-yellow">
                            Edit
                        </button>
                    </div> */}
                </div>
                <div className="row  d-flex justify-content-between">
                    <div className="col-12 col-md-5 ">
                        <div className="row">
                            <div className="col-12 col-md-6">
                                Name of Organization
                            </div>
                            <div className="col-12 col-md-6">
                                <input type={"text"} className="form-control" value={companyName} onChange={(e) => setcompanyName(e.target.value)} placeholder='Name ...' />

                            </div>
                        </div>
                    </div>
                    <div className="border-right"></div>
                    <div className="col-12 col-md-5 pt-4" >
                        <div className="row">
                            <div className="col-12 col-md-6">
                                Landline
                            </div>
                            <div className="col-12 col-md-6">
                                <input type={"text"} className="form-control" value={landline} onChange={(e) => setLandline(e.target.value)} placeholder='Name ...' />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-5 my-4">
                        <div className="row">
                            <div className="col-12 col-md-6">
                                Organization Phone
                            </div>
                            <div className="col-12 col-md-6">
                                <input type={"text"} className="form-control" value={companyPhone} onChange={(e) => setcompanyPhone(e.target.value)} placeholder='Name ...' />
                            </div>
                        </div>
                    </div>
                    <div className="border-right"></div>
                    <div className="col-12 col-md-5 my-4">
                        <div className="row">
                            <div className="col-12 col-md-6">
                                Role
                            </div>
                            <div className="col-12 col-md-6">
                                <input type={"text"} className="form-control" value={userObj?.role} disabled placeholder='Name ...' />
                            </div>
                        </div>
                    </div>


                    {
                        role != ROLES_CONSTANT.USER &&
                        <>
                            <div className="col-12 col-md-5 my-4">
                                <div className="row">
                                    <div className="col-12 col-md-6 ">
                                        Country
                                    </div>
                                    <div className="col-12 col-md-6">
                                        {
                                            countryArr && (
                                                <select className="form-control" value={countryId} onChange={(e) => { setcountryId(e.target.value); setcityArr([]) }}>
                                                    <option value="">Please Select Country</option>
                                                    {countryArr.map((country) => (
                                                        <option value={country._id} >{country.name}</option>
                                                    ))}
                                                </select>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="border-right"></div>
                            <div className="col-12 col-md-5 my-4">
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        State
                                    </div>
                                    <div className="col-12 col-md-6">
                                        {
                                            stateArr && (
                                                <select className="form-control" value={stateId} onChange={(e) => setstateId(e.target.value)}>
                                                    <option value="">Please Select State</option>
                                                    {stateArr.map((state) => (
                                                        <option value={state._id} >{state.name}</option>
                                                    ))}
                                                </select>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-5 my-4">
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        Aniversary Date
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={moment(aniversaryDate).format("YYYY-MM-DD")}
                                            onChange={(e) => setAniversaryDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="border-right"></div>
                            <div className="col-12 col-md-5 my-4">
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
                            </div>
                            <div className="col-12 col-md-5 my-4">
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        City
                                    </div>
                                    <div className="col-12 col-md-6">
                                        {
                                            cityArr && (
                                                <select className="form-control" value={cityId} onChange={(e) => setcityId(e.target.value)}>
                                                    <option value="">Please Select City</option>
                                                    {cityArr.map((city) => (
                                                        <option value={city._id} >{city.name}</option>
                                                    ))}
                                                </select>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="border-right"></div>
                            <div className="col-5 my-4">

                            </div>


                            <div className="col-12 col-md-5  my-4">
                                <div className="row">
                                    <div className="col-12">
                                        Banner Image <b className='text-dark ms-3'>(width:1775px and height:367px)</b>
                                    </div>
                                    <div className="col-12">
                                        {
                                            bannerImage && bannerImage.includes("base64") ?
                                                <a target={"_blank"}> <img src={bannerImage} style={{ width: 150 }} alt="" srcset="" /></a>
                                                :
                                                <a target={"_blank"} href={generateImageUrl(bannerImage)}> <img src={generateImageUrl(bannerImage)} style={{ width: 150 }} alt="" srcset="" /></a>

                                        }
                                        <FileInput setFile={async (e) => {
                                            let base64 = await convertFileToBase64(e);
                                            setBannerImage(base64)
                                        }} file={bannerImage} type="image" previousFile={(bannerImage && bannerImage != "" && bannerImage.includes("base64")) ? bannerImage : null} />

                                    </div>
                                </div>
                            </div>
                            <div className="border-right"></div>
                            <div className="col-12 col-md-5 my-4">
                                <div className="row">
                                    <div className="col-12">
                                        Profile Image
                                        <b className='text-dark ms-3'>(widht:150px and height:150px)</b>
                                    </div>
                                    <div className="col-12">
                                        {
                                            profileImage && profileImage.includes("base64") ?
                                                <a target={"_blank"}> <img src={profileImage} style={{ width: 150 }} alt="" srcset="" /></a>
                                                :
                                                <a target={"_blank"} href={generateImageUrl(profileImage)}> <img src={generateImageUrl(profileImage)} style={{ width: 150 }} alt="" srcset="" /></a>

                                        }
                                        <FileInput setFile={async (e) => {
                                            let base64 = await convertFileToBase64(e);
                                            setprofileImage(base64)
                                        }} file={profileImage} type="image" previousFile={(profileImage && profileImage != "" && profileImage.includes("base64")) ? profileImage : null} />
                                    </div>
                                </div>
                            </div>



                            <div className="col-12 col-md-5 my-4">
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        Category
                                    </div>
                                    <Select className='form-control' options={categoryArr && categoryArr.length > 0 && categoryArr.map((el) => ({ ...el, label: el.name, value: el._id }))} value={category} closeMenuOnSelect={false} onChange={(e) => setcategory(e)} isMulti />

                                </div>
                            </div>
                            <div className="border-right"></div>
                            <div className="col-12 col-md-5 my-4">
                                <div className="row">
                                    <div className="col-12 col-md-12">
                                        Brand Names
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={brandNames}
                                        onChange={(e) => setBrandNames(e.target.value)}
                                    />
                                </div>
                            </div>








                            <div className="col-12 mt-4">
                                <label> Address <span className="text-danger">*</span></label>
                                <textarea
                                    className="form-control"
                                    value={address}
                                    onChange={(e) => setaddress(e.target.value)}
                                ></textarea>
                            </div>
                        </>
                    }


                </div>
                {
                    role == ROLES_CONSTANT.USER &&
                    <div className="row  mt-5 d-flex justify-content-center">
                        <button type="button" onClick={() => { handleUpdateUserDetails() }} className="btn btn-custom btn-yellow col-3" >
                            Save
                        </button>
                    </div>
                }
            </div>

            {
                role != ROLES_CONSTANT.USER &&
                <div className="profile-section-container rounded" style={{ width: "100%" }}>
                    <div className="profile-section-Heading">Contact Personal Details</div>
                    <div className="row mt-4 d-flex justify-content-between">
                        <div className="col-12 col-md-5 pt-4">

                            <div className="row">
                                <div className="col-12 col-md-6">
                                    Name of Authorised person
                                </div>
                                <div className="col-12 col-md-6">
                                    <input type={"text"} className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name ...' />
                                </div>
                            </div>
                        </div>
                        <div className="border-right"></div>
                        <div className="col-md-5 col-12 col-5 pt-4" >
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    Whatsapp No.
                                </div>
                                <div className="col-12 col-md-6">
                                    <input type={"text"} className="form-control" value={whatsapp} onChange={(e) => setwhatsapp(e.target.value)} placeholder='Name ...' />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-5 mt-4">
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    Mobile No.
                                </div>
                                <div className="col-12 col-md-6">
                                    <input type={"text"} className="form-control" value={phone} onChange={(e) => setphone(e.target.value)} placeholder='Name ...' />
                                </div>
                            </div>
                        </div>
                        <div className="border-right"></div>

                        <div className="col-12 col-md-5 mt-4">
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    Nature of your business
                                </div>
                                <div className="col-12 col-md-6">
                                    <input type={"text"} className="form-control" value={natureOfBusiness} onChange={(e) => setNatureOfBusiness(e.target.value)} placeholder='Name ...' />
                                </div>
                            </div>
                        </div>


                        <div className="col-12 col-md-5 mt-4">
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    Year of Establishment
                                </div>
                                <div className="col-12 col-md-6">
                                    <input type={"text"} className="form-control" value={yearOfEstablishment} onChange={(e) => setYearOfEstablishment(e.target.value)} placeholder='Name ...' />
                                </div>
                            </div>
                        </div>


                        <div className="border-right"></div>
                        <div className="col-5 my-4">
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    GST Number
                                </div>
                                <div className="col-12 col-md-6">
                                    <input type={"text"} className="form-control" value={gstNumber} onChange={(e) => setgstNumber(e.target.value)} placeholder='Name ...' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                role != ROLES_CONSTANT.USER &&
                <div className="profile-section-container rounded" style={{ width: "100%" }}>
                    <div className="profile-section-Heading">Upload Document</div>
                    <div className="row mt-4 d-flex justify-content-between">
                        <div className="row d-flex">
                            <div className="col-12 col-md-10 d-flex">
                                <div className="profile-section-Heading">Upload image</div>
                                <b className="text-dark ms-3">(width:275px and height:285px)</b>
                            </div>
                            <div className="col-6 col-md-2 d-flex justify-content-between">
                                <button type="button" onClick={() => { handleAddImage() }} className="btn btn-custom btn-yellow" >
                                    +
                                </button><button type="button" onClick={() => { handleRemoveImage() }} className="btn btn-custom btn-yellow" >
                                    -
                                </button>
                            </div>
                        </div>
                        {
                            imagesArr && imagesArr.length > 0 && imagesArr.map((el, index) => {
                                return (
                                    <div className="col-md-6 mb-3" key={index}>
                                        <div>
                                            {
                                                el.image && el.image.includes("base64") ?
                                                    <a target={"_blank"}> <img src={el.image} style={{ height: 150 }} alt="" srcset="" /></a>
                                                    :
                                                    <a target={"_blank"} href={generateImageUrl(el.image)}> <img src={generateImageUrl(el.image)} style={{ height: 150 }} alt="" srcset="" /></a>

                                            }
                                        </div>
                                        <FileInput setFile={async (e) => {
                                            let base64 = await convertFileToBase64(e);
                                            handleSetImage(index, base64)
                                        }} key={index} file={el.image} type="image" previousFile={(el.image && el.image != "" && el.image.includes("base64")) ? el.image : null} />
                                        {/* <FileUpload onFileChange={(value) => handleSetImage(index, value)} /> */}
                                    </div>
                                )
                            })
                        }

                        <hr />

                        <div className="row d-flex">
                            <div className="col-12 col-md-10">
                                <div className="profile-section-Heading">Upload Video </div>
                            </div>
                            <div className="col-6 col-md-2 d-flex justify-content-between">
                                <button type="button" onClick={() => { handleAddVideo() }} className="btn btn-custom btn-yellow" >
                                    +
                                </button><button type="button" onClick={() => { handleRemoveVideo() }} className="btn btn-custom btn-yellow" >
                                    -
                                </button>
                            </div>
                        </div>
                        {
                            videoArr && videoArr.length > 0 && videoArr.map((el, index) => {
                                return (
                                    <div className="col-md-6 mb-3" key={index}>
                                        <div>
                                            {
                                                el.video && el.video.includes("base64") ?
                                                    <video height={100} width={100} src={el.video} />
                                                    // <a target={"_blank"}> <img src={el.image} style={{ height: 150 }} alt="" srcset="" /></a>
                                                    :

                                                    <video height={100} width={100} src={generateImageUrl(el.video)} />
                                                // <a target={"_blank"} href={generateImageUrl(el.image)}> <img src={generateImageUrl(el.image)} style={{ height: 150 }} alt="" srcset="" /></a>

                                            }
                                        </div>
                                        <FileUpload acceptedType={"video/mp4,video/x-m4v,video/*"} onFileChange={(value) => handleSetVideo(index, value)} />
                                    </div>
                                )
                            })
                        }
                        {/* <div className="profile-section-Heading">Video Uploaded</div>

                        <div className="col-md-6 mb-3">
                            <div>
                                {
                                    gstCertificate && gstCertificate.includes("base64") ?
                                        <a target={"_blank"}> <img src={gstCertificate} style={{ height: 150 }} alt="" srcset="" /></a>
                                        :
                                        <a target={"_blank"} href={generateImageUrl(gstCertificate)}> <img src={generateImageUrl(gstCertificate)} style={{ height: 150 }} alt="" srcset="" /></a>

                                }
                            </div>
                            <FileUpload onFileChange={(value) => setgstCertificate(value)} />
                        </div> */}



                        <div className="row  mt-5 d-flex justify-content-center">
                            <button type="button" onClick={() => { handleUpdateUserDetails() }} className="btn btn-custom btn-yellow col-3" >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}
