import moment from 'moment';
import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { generateImageUrl } from '../../services/url.service';
import { getUserById } from '../../services/User.service';
import { ROLES_CONSTANT } from '../Utility/constant';
import { errorToast } from '../Utility/Toast';
import { AiFillHome, AiOutlineLogout, AiTwotoneSetting } from "react-icons/ai";
import { BiBell, BiChevronDown, BiSearch } from "react-icons/bi";
import { FaUserCheck } from "react-icons/fa";
import { GrProductHunt } from "react-icons/gr";
import {
    MdLocalOffer,
    MdOutlineSubscriptions,
    MdSportsEsports,
    MdSubscriptions,
} from "react-icons/md";
import {
    Link,

    useSearchParams,
} from "react-router-dom";
import {
    login,
    logoutUser,
    otpSend,
} from "../../redux/features/auth/authSlice";
import '../../assets/css/ShopDetail.css'
export default function Profile() {
    const dispatch = useDispatch();

    let role = useSelector(state => state.auth.role)
    let id = useSelector(state => state.auth.user._id)
    const [signInList, setSignInList] = useState([
        {
            name: "Profile",
            icon: <AiFillHome />,
            link: "/My-Profile",
        },
        // {
        //   name: "Post Your Requiement",
        //   icon: <GiPostOffice />,
        //   link: "/",
        // },
        {
            name: "My Products",
            icon: <GrProductHunt />,
            link: "/MyProducts",
        },
        // {
        //   name: "Verified Business Buyer",
        //   icon: <FaUserCheck />,
        //   link: "/",
        // },
        // {
        //   name: "Products/Services Directory",
        //   icon: <MdOutlineDocumentScanner />,
        //   link: "/",
        // },
        // {
        //   name: "My Orders",
        //   icon: <AiFillGift />,
        //   link: "/",
        // },
        {
            name: "My Leads",
            icon: <FaUserCheck />,
            link: "/MyLeads",
        },
        {
            name: "My Subscriptions",
            icon: <MdOutlineSubscriptions />,
            link: "/MySubscriptions",
        },
        // {
        //   name: "Subscription",
        //   icon: <MdSubscriptions />,
        //   link: "/Subscription",
        // },
        {
            name: "Topup",
            icon: <MdSubscriptions />,
            link: "/Topup",
        },
        {
            name: "Recent Activity",
            icon: <MdSportsEsports />,
            link: "/Recent-Activities",
        },
        {
            name: "My Flash-Sales",
            icon: <MdLocalOffer />,
            link: "/View/My-FlashSales",
        },
        {
            name: "My Promotions",
            icon: <MdLocalOffer />,
            link: "/View/My-Promotions",
        },
        {
            name: "Notifications",
            icon: <AiTwotoneSetting />,
            link: "/notifications",
        },
    ]);
    const [userObj, setUserObj] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();
    const [showSignIn, setShowSignIn] = useState(false);
    const [otpsent, setotpsent] = useState(false);
    const [mobile, setmobile] = useState("");

    const [otp, setotp] = useState("");

    const [signInModal, setSignInModal] = useState(false);
    const navigate = useNavigate()

    const handleGetUser = async () => {
        try {
            let { data: res } = await getUserById(id)
            if (res.data) {
                console.log(res.data, "dataa")
                setUserObj(res.data);
            }
        }
        catch (err) {
            errorToast(err)
        }
    }


    useEffect(() => {

        handleGetUser()

    }, [])
    useEffect(() => {
        if (searchParams.get("loginTriggered")) {
            setSignInModal(true);
            setSearchParams((prev) => console.log(prev, "prev"));
        }
    }, [searchParams.get("loginTriggered")]);
    useEffect(() => {
        if (searchParams.get("loginTriggered")) {
            setSignInModal(true);
            setSearchParams((prev) => console.log(prev, "prev"));
        }
    }, [searchParams.get("loginTriggered")]);

    const wrapperRef = useRef(null);
    const wrapperLoggedOutRef = useRef(null);

    useEffect(() => {
        function handleClickOutsideLoggedOut(event) {
            if (
                wrapperLoggedOutRef.current &&
                !wrapperLoggedOutRef.current.contains(event.target)
            ) {
                setShowSignIn(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutsideLoggedOut);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideLoggedOut);
        };
    }, [wrapperLoggedOutRef, wrapperLoggedOutRef.current]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSignIn(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef, wrapperRef.current]);

    const handleLogout = () => {
        // deleteToken()
        dispatch(logoutUser());
        setotp("");
        setmobile("");
        setotpsent(false);

        // setIsAuthorized(false)
    };

    return (
        <>
            <div className=' container-fluid userprofile'>
                <div className=' row'>
                    <div className=' col-lg-8'></div>
                    <div className=' col-lg-3 py-5'>
                        <div ref={wrapperRef} className=' userprofileoptions py-3'>

                            {signInList.map((item, i) => {
                                return (
                                    <Link to={item.link}>
                                        <div key={i} className='row d-flex justify-content-center align-items-center boxes pt-2 pb-1 mx-5 '>

                                            <div className=" col-3 d-flex justify-content-center ">
                                                <div className='userprofileoptionsicon '>{item.icon}</div>
                                            </div>
                                            <div className='  col-9 d-flex justify-content-start align-items-center userprofileoptionstext fs-5'>
                                                {item.name}
                                            </div>

                                        </div>
                                    </Link>
                                );
                            })}
                            <Link onClick={() => handleLogout()}>
                                <div className='row d-flex justify-content-center align-items-center  pt-2 pb-1 mx-5 '>

                                    <div className=" col-3 d-flex justify-content-center ">
                                        <div className='userprofileoptionsicon '>   <AiOutlineLogout /></div>
                                    </div>
                                    <div className='  col-9 d-flex justify-content-start align-items-center userprofileoptionstext fs-5'>
                                        Logout
                                    </div>

                                </div>
                            </Link>


                        </div>
                    </div>
                    <div className='col-lg-1'></div>
                </div>
            </div>
            <div className='container my-5'>


                <div className="row">
                    {
                        role != ROLES_CONSTANT.USER &&
                        <div>
                            <div className="row d-flex justify-content-between">
                                <div className="col-12 col-sm-6 col-md-6 col-lg-6 pt-2 profile-section-Heading">Subscription Status</div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-6 pt-2 d-flex justify-content-end">
                                    {
                                        userObj?.subscriptionEndDate &&
                                        <div className="theme-outline-button">
                                            Subscription ends On -  {moment(userObj?.subscriptionEndDate).format("DD-MM-YYYY")}  ({userObj?.isBlocked ? "Blocked Subscription" : "Active Subscription"})
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="row mt-4 d-flex justify-content-between">
                                <div className="col-12">
                                    <div className="row d-flex justify-content-between">
                                        {/* <h4 className="col-12">
                        {userObj?.userSubscriptionMessage}
                    </h4> */}
                                        {/* <h6 className="mt-3 p-3 theme-outline-button" style={{ width: "30%" }}>
                        <div style={{ fontSize: 25, fontWeight: 600, color: "rgba(0,0,0,0.5)" }}>
                            Advertisement balance
                        </div>
                        <div className='mt-3' style={{ fontSize: 20, color: "black", fontWeight: 300 }}>
                            {userObj?.numberOfPromotions ? userObj?.numberOfPromotions : 0}
                        </div>
                    </h6>
                    <h6 className="mt-3 p-3 theme-outline-button" style={{ width: "30%" }}>
                        <div style={{ fontSize: 25, fontWeight: 600, color: "rgba(0,0,0,0.5)" }}>
                            Flashsale balance
                        </div>
                        <div className='mt-3' style={{ fontSize: 20, color: "black", fontWeight: 300 }}>{userObj?.numberOfSales ? userObj?.numberOfSales : 0}</div>
                    </h6>
                    <h6 className="mt-3 p-3 theme-outline-button" style={{ width: "30%" }}>
                        <div style={{ fontSize: 25, fontWeight: 600, color: "rgba(0,0,0,0.5)" }}>
                            Flashsale balance (Days)
                        </div>
                        <div className='mt-3' style={{ fontSize: 20, color: "black", fontWeight: 300 }}>
                            {userObj?.saleDays ? userObj?.saleDays : 0}
                        </div>
                    </h6> */}

                                        <div className="col-12 col-md-6">
                                            <div className="mt-3 p-3 profile-section-container porfilebox">
                                                <h4 >
                                                    Advertisement balance
                                                </h4>
                                                <h6>
                                                    {userObj?.numberOfAdvertisement ? userObj?.numberOfAdvertisement : 0}
                                                </h6>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="mt-3 p-3 profile-section-container porfilebox" >
                                                <h4>Advertisement balance (Days)</h4>
                                                <h6>{userObj?.advertisementDays ? userObj?.advertisementDays : 0}</h6>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="mt-3 p-3 profile-section-container porfilebox">
                                                <h4>Flashsale balance</h4>
                                                <h6 className='mt-3'>{userObj?.numberOfSales ? userObj?.numberOfSales : 0}</h6>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <h6 className="mt-3 p-3 profile-section-container porfilebox">
                                                <h4>
                                                    Flashsale balance (Days)
                                                </h4>
                                                <h6>
                                                    {userObj?.saleDays ? userObj?.saleDays : 0}
                                                </h6>
                                            </h6>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className="row d-flex justify-content-between">
                    <div className="col-12 col-lg-6">
                        <div className="profile-section-container">
                            <div className="row d-flex justify-content-between">
                                <div className="col-6 pt-2 profile-section-Heading">Personal Details</div>
                                <div className="col-6 text-end">
                                    <button type="button" onClick={() => { navigate(`/Edit-Profile`) }} className="theme-outline-button" style={{ display: 'unset' }}>
                                        Edit
                                    </button>
                                    <button type="button" onClick={() => { navigate(`/Supplier/${userObj?._id}`) }} className="theme-outline-button" style={{ display: 'unset', marginLeft: 15 }}>
                                        View Profile
                                    </button>
                                </div>
                            </div>
                            <div className="row mt-4 d-flex justify-content-between">
                                <div className="row mt-4">
                                    <div className="col-5 my-1">
                                        User Name:
                                    </div>
                                    <div className="col-7  my-1" style={{ wordBreak: "break-all" }}>
                                        {userObj?.name}
                                    </div>
                                    <div className="col-5 my-1">
                                        Phone:
                                    </div>
                                    <div className="col-7  my-1" style={{ wordBreak: "break-all" }}>
                                        {userObj?.phone}
                                    </div>
                                    <div className="col-5 my-1">
                                        Role:
                                    </div>
                                    <div className="col-7  my-1" style={{ wordBreak: "break-all" }}>
                                        {userObj?.role}
                                    </div>


                                    <div className="col-5 my-1">
                                        Country:
                                    </div>
                                    <div className="col-7  my-1" style={{ wordBreak: "break-all" }}>
                                        {userObj?.countryObj?.name ? userObj?.countryObj?.name : "N.A."}
                                    </div>
                                    <div className="col-5 my-1">
                                        State:
                                    </div>
                                    <div className="col-7  my-1" style={{ wordBreak: "break-all" }}>
                                        {userObj?.stateObj?.name ? userObj?.stateObj?.name : "N.A."}
                                    </div>
                                    <div className="col-5 my-1">
                                        City:
                                    </div>
                                    <div className="col-7  my-1" style={{ wordBreak: "break-all" }}>
                                        {userObj?.cityObj?.name ? userObj?.cityObj?.name : "N.A."}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6">
                        {
                            role != ROLES_CONSTANT.USER &&
                            <div className="profile-section-container rounded">
                                <div className="profile-section-Heading">Company Details</div>
                                <div className="row mt-4 d-flex justify-content-between">
                                    <div className="col-5 my-1">
                                        Company Name:
                                    </div>
                                    <div className="col-7  my-1" style={{ wordBreak: "break-all" }}>
                                        {userObj?.companyObj?.name}
                                    </div>
                                    <div className="col-5 my-1">
                                        Company Email:
                                    </div>
                                    <div className="col-7  my-1" style={{ wordBreak: "break-all" }}>
                                        {userObj?.companyObj?.email}
                                    </div>
                                    <div className="col-5 my-1">
                                        Company Phone:
                                    </div>
                                    <div className="col-7  my-1" style={{ wordBreak: "break-all" }}>
                                        {userObj?.companyObj?.phone}
                                    </div>
                                    <div className="col-5 my-1">
                                        Dealing With Brand Names:
                                    </div>
                                    <div className="col-7  my-1" style={{ wordBreak: "break-all" }}>
                                        {userObj?.brandNames}
                                    </div>
                                    {/* <div className="col-5 my-1">
                    Number of Employees:
                </div>
                <div className="col-7  my-1" style={{ wordBreak: "break-all" }}>
                    {userObj?.companyObj?.noofepmployee}
                </div> */}
                                    <div className="col-5 my-1">
                                        GST Number:
                                    </div>
                                    <div className="col-7  my-1" style={{ wordBreak: "break-all" }}>
                                        {userObj?.companyObj?.gstNumber}
                                    </div>
                                    <div className="col-5 my-1">
                                        Address:
                                    </div>
                                    <div className="col-7  my-1" style={{ wordBreak: "break-all" }}>
                                        {userObj?.companyObj?.address}
                                    </div>


















                                    {/* <div className="col-5 my-1">
                        Nature of your business:
                    </div>
                    <div className="col-7  my-1" style={{ wordBreak: "break-all" }}>
                        {userObj?.companyObj?.natureOfBusiness}
                    </div> */}
                                    {/* <div className="col-5 my-1">
                        Annual Turnover:
                    </div>
                    <div className="col-7  my-1" style={{ wordBreak: "break-all" }}>
                        {userObj?.companyObj?.annualTurnover}
                    </div> */}

                                    <div className="col-5 my-1">
                                        Year of Establishment:
                                    </div>
                                    <div className="col-7  my-1" style={{ wordBreak: "break-all" }}>
                                        {userObj?.companyObj?.yearOfEstablishment}
                                    </div>
                                    {/* <div className="col-5 my-1">
                        Legal Status:
                    </div>
                    <div className="col-7  my-1" style={{ wordBreak: "break-all" }}>
                        {userObj?.companyObj?.legalStatus}
                    </div> */}
                                    {/* <div className="col-5 my-1">
                        Company Ceo Name:
                    </div>
                    <div className="col-7  my-1" style={{ wordBreak: "break-all" }}>
                        {userObj?.companyObj?.companyCeo}
                    </div> */}
                                    <div className="col-5 my-1">
                                        Google Maps Link:
                                    </div>
                                    <div className="col-7  my-1" style={{ wordBreak: "break-all" }}>
                                        {userObj?.companyObj?.googleMapsLink}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>

                {
                    role != ROLES_CONSTANT.USER &&
                    <div style={{ width: "100%" }} className="profile-section-container rounded">
                        <div className="profile-section-Heading">Documents Uploaded</div>
                        <div className="row mt-4 d-flex justify-content-between">
                            {
                                userObj?.documents && userObj?.documents.length > 0 && userObj?.documents.map((el, index) => {
                                    return (
                                        <div className="col-12 pt-4" key={index}>
                                            <div className="row">
                                                <div className="col-12 col-lg-4" style={{ fontSize: 20, fontWeight: "500", textTransform: "capitalize", color: "rgba(0,0,0,0.4)" }} >
                                                    {el.name}
                                                </div>
                                                <div className="col-12 col-lg-8">
                                                    <a target={"_blank"} href={generateImageUrl(el.image)}><img style={{ height: 200 }} src={generateImageUrl(el.image)} alt="" /></a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <hr />
                        <div className="profile-section-Heading mt-4">Images Uploaded</div>
                        <div className="row mt-4 d-flex justify-content-between">
                            {
                                userObj?.imagesArr && userObj?.imagesArr.length > 0 && userObj?.imagesArr.map((el, index) => {
                                    return (
                                        <div className="col-6 col-md-2 border rounded d-flex justify-content-center align-items-center py-3" key={index}>
                                            <a target={"_blank"} href={generateImageUrl(el.image)}><img style={{ height: 150, width: 150 }} src={generateImageUrl(el.image)} alt="" /></a>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <hr />
                        <div className="profile-section-Heading mt-4">Videos Uploaded</div>
                        <div className="row mt-4 d-flex justify-content-between gap-1">
                            {
                                userObj?.videoArr && userObj?.videoArr.length > 0 && userObj?.videoArr.map((el, index) => {
                                    return (
                                        <div className="col-6 col-md-2  border rounded d-flex justify-content-center align-items-center py-3" key={index}>
                                            <a target={"_blank"} href={generateImageUrl(el.video)}>
                                                <video height={100} width={100} src={generateImageUrl(el.video)} />
                                            </a>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }

            </div >
        </>
    )
}
