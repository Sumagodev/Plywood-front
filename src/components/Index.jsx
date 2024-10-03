import React, { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { BsArrowRight, BsStarFill } from "react-icons/bs";
import { FaArrowUp, FaHandshake, FaRegStar, FaStar } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { MdCall } from "react-icons/md";
import { getDecodedToken, getToken } from "../services/auth.service";
import {
  getUserNotifications,
  searchVendorFromDb,
  sentOtp,
} from "../services/User.service";
import {
  login,
  logoutUser,
  otpSend,
} from "../redux/features/auth/authSlice";
import { RiMessage2Line } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, redirect } from "react-router-dom";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { LuPhoneCall } from "react-icons/lu";
import location from "../assets/image/home/image-removebg-preview (17) 1.png";
import grlm from "../assets/image/home/Mask Group.png";
import grls from "../assets/image/home/Mask Group (1).png";
import img4 from "../assets/image/home/Group 1000004263.png";
import banner1 from "../assets/images/banner1.png";
import banner2 from "../assets/images/banner2.jpg";
import banner3 from "../assets/images/banner3.jpg";
import banner4 from "../assets/images/banner4.jpg";
import banner5 from "../assets/images/banner5.jpg";
import banner6 from "../assets/images/banner6.jpg";
import banner7 from "../assets/images/banner7.jpg";
import chkimg from "../assets/images/checkimg.png";
import img1 from "../assets/image/home/imgdelhi.png";
import img2 from "../assets/image/home/imgmumbai.png";
import img3 from "../assets/image/home/imgkolkata.png";
import img7 from "../assets/image/home/imghyderabad.png";
import img5 from "../assets/image/home/imggujarat.png";
import "../assets/css/home.css";
import successgif from "../assets/images/verified.gif";
// import { fetchToken } from "../firebase";
import { getForHomepage } from "../services/Advertisement.service";
import { getBrands } from "../services/Banner.service";
import { getBlogApi } from "../services/Blog.service";
import { getBlogVideoApi } from "../services/BlogVideo.service";
import { getNestedCategories } from "../services/Category.service";
import { getAllFlashSales } from "../services/FlashSales.service";
import {
  checkForValidSubscriptionAndReturnBoolean,
  registerUserFcmToken,
} from "../services/User.service";
import { images } from "./Utility/Images";
import { addUserRequirement } from "../services/UserRequirements.service";
import { getHomePageBannersApi } from "../services/homepageBanners.service";
import { generateImageUrl } from "../services/url.service";
import { toastSuccess } from "../utils/toastutill";
import CountdownTimer from "./Utility/CountdownTimer";
import { errorToast, successToast } from "./Utility/Toast";
import Ellipse from "../assets/image/home/Ellipse 27.png";
// import playbanner from "../assets/image/home/Group 1000004149.png";
import playbanner from "../assets/image/home/addopimg.jpg";

import dealer from "../assets/images/Group 1000004290 (1).png"
import { FaPhoneVolume } from "react-icons/fa6";
import icon1 from "../assets/image/home/images/1.png";
import mancrp from "../assets/image/home/images/mancrp.png";
import { IoIosStarOutline, IoMdMailOpen } from "react-icons/io";
import { BiSolidMessage } from "react-icons/bi";
import { MdThumbUp } from "react-icons/md";
import { IoLocationSharp, IoStar } from "react-icons/io5";
import greenimg from "../assets/image/home/images/greenlam1.png";
import "../assets/css/Blog.css";
import {
  deleteProductbyId,
  getProducts,
} from "../services/Product.service";
import { gettopUsers } from "../services/User.service"
import { getStateDetails } from "../services/State.stateDetail";
import { getAlldealership } from '../services/AddDealership.service'
function Index() {
  const tempLoginObj = useSelector((state) => state.auth.tempLoginObj);
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [categoryArr, setcategoryArr] = useState([]);
  const [brandArr, setbrandArr] = useState([]);
  const [flashSalesArr, setFlashSalesArr] = useState([]);
  const [stateDetails, setStateDetails] = useState([]);
  const auth = useSelector((state) => state.auth.user);
  const mainAuthObj = useSelector((state) => state.auth);
  let role = useSelector((state) => state.auth.role);
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);
  const userObj = useSelector((state) => state.auth.user);
  const [homepageBannersArr, setHomepageBannersArr] = useState([]);

  const [isDisplayingAll, setIsDisplayingAll] = useState(false);
  const [isMobileNumberVisible, setIsMobileNumberVisible] = useState(false);
  const [
    currentUserHasActiveSubscription,
    setCurrentUserHasActiveSubscription,
  ] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(true);

  const [name, setname] = useState();
  const [Name, setName] = useState();

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [productName, setProductName] = useState("");
  const [advertisementsArr, setAdvertisementsArr] = useState([]);

  const [signInModal, setSignInModal] = useState(false);
  const [opportunities, setOpportunities] = useState([]);
  const dispatch = useDispatch();

  const fetchOpportunities = async () => {
    try {
      const response = await getAlldealership();
      setOpportunities(response.data.data.filter(opportunity => !userObj || opportunity.userId !== userObj._id));
      console.log("sdfes", response.data)
    } catch (error) {
      console.error('Error fetching dealership opportunities:', error);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);




  useEffect(() => {
    if (auth && auth._id) {
      HandleCheckValidSubscription();
    }
  }, [auth]);
  const HandleCheckValidSubscription = async () => {
    try {
      let { data: res } = await checkForValidSubscriptionAndReturnBoolean(
        auth?._id
      );
      if (res.data) {
        setCurrentUserHasActiveSubscription(res.data);
      }
    } catch (err) {
      // toastError(err)
    }
  };

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);


  const navigate = useNavigate();



  const handleSubmitRequirement = async (e) => {
    e.preventDefault();
    try {
      if (name == "") {
        errorToast("Name cannot be empty");
        return;
      }
      if (phone == "") {
        errorToast("Mobile number cannot be empty");
        return;
      }
      if (address == "") {
        errorToast("Address cannot be empty");
        return;
      }
      if (productName == "") {
        errorToast("Product cannot be empty");
        return;
      }
      if (!auth || auth._id == "") {
        errorToast("Please login to submit request");
        return;
      }

      let obj = {
        name,
        phone,
        address,
        productName,
        userId: auth._id,
      };
      let { data: res } = await addUserRequirement(obj);
      // console.log(res, "====<>");
      if (res.message) {
        toastSuccess(res.message);

        setSignInModal(true);
      }
    } catch (err) {
      // console.log()
      errorToast(err);
    }
  };

  const handleGetFlashSales = async () => {
    try {
      let date = new Date();
      date.setDate(date.getDate() - 1);
      let enddate = `${date.getFullYear()}-${(date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1)
        }-${(date.getDate() + 1 < 10 ? "0" : "") + date.getDate()}`;
      let { data: res } = await getAllFlashSales("endDate=" + enddate);
      if (res.data) {
        // console.log(res.data, "flash sales");
        setFlashSalesArr(res.data);
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const handleNestedcategories = async () => {
    try {
      let { data: res } = await getNestedCategories();
      if (res.data && res.data?.length > 0) {
        // console.log(res.data, "res.data");
        setcategoryArr(res.data.map((el) => ({ ...el, checked: false })));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBrands = async () => {
    try {
      let { data: res } = await getBrands("status=true");
      if (res.data && res.data?.length > 0) {
        setbrandArr(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAdvvertisementForHomepage = async () => {
    try {
      let { data: res } = await getForHomepage();
      if (res.data) {
        // console.log(res.data, "data");
        setAdvertisementsArr(res.data);
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const handleGetHomepageBanners = async () => {
    try {
      let res = await getHomePageBannersApi();

      // console.log(res.data, "data");
      setHomepageBannersArr(res.data.bannerImages);

    } catch (err) {
      errorToast(err);
    }
  };

  useEffect(() => {
    handleGetHomepageBanners();
    handleGetAdvvertisementForHomepage();
    handleNestedcategories();
    handleBrands();
    handleGetFlashSales();
  }, []);

  const fretureprod = {
    0: {
      slidesPerView: 2,
    },
    576: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 3,
    },
    1400: {
      slidesPerView: 4,
    },
  };
  const states = {
    0: {
      slidesPerView: 2,
    },
    576: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
    1400: {
      slidesPerView: 7,
    },
  };
  const findsuppers = {
    0: {
      slidesPerView: 2,
    },
    576: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
    1400: {
      slidesPerView: 5,
    },
  };
  const flashsale = {
    0: {
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 3,
    },
    1400: {
      slidesPerView: 3,
    },
  };
  const cities = [
    { imgSrc: img1, name: "Delhi" },
    { imgSrc: img2, name: "Mumbai" },
    { imgSrc: img3, name: "Kolkata" },
    { imgSrc: img7, name: "Hyderabad" },
    { imgSrc: img5, name: "Gujarat" },
  ];
  const blogbreakpont = {
    0: {
      slidesPerView: 1,
    },
    567: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
    1300: {
      slidesPerView: 4,
    },
  };
  const ourvideos = {
    0: {
      slidesPerView: 2,
    },
    567: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 4,
    },
    1300: {
      slidesPerView: 4,
    },
  };

  const [showScroll, setShowScroll] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  window.addEventListener("scroll", handleScroll);
  const [activeTab, setActiveTab] = useState("blog");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [blogsArr, setBlogsArr] = useState([]);
  const [showBlogs, setShowBlogs] = useState(false);
  const [blogVideoArr, setBlogVideoArr] = useState([]);

  const handleGetBlogs = async () => {
    try {
      let { data: res } = await getBlogApi();
      if (res.data) {
        setBlogsArr(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetBlogVideo = async () => {
    try {
      let { data: res } = await getBlogVideoApi();
      if (res.data) {
        setBlogVideoArr(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleStateDetails = async () => {
    try {
      let { data: res } = await getStateDetails();
      // console.log("res.datassssssssss", res.data);

      if (res.data) {
        setStateDetails(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetBlogs();
    handleGetBlogVideo();
    handleStateDetails();
  }, []);
  const [productArr, setProductArr] = useState([]);

  const handleGetProducts = async () => {
    try {


      let { data: res } = await getProducts();
      if (res.data) {
        setProductArr(res.data);
      }
    } catch (err) {
      errorToast(err);
    }
  };
  useEffect(() => {
    handleGetProducts();
  }, []);
  const [topusers, settopusers] = useState([]);
  const handleRegister = () => {
    setSignInModal(false);
    return redirect("/Register");
  };
  const [loginByEmail, setLoginByEmail] = useState(false);

  const [email, setEmail] = useState("");
  const [otpsent, setotpsent] = useState(false);
  const [totalNotification, settotalNotification] = useState(0);
  const [mobile, setmobile] = useState("");
  const [otp, setotp] = useState("");
  const handleGetUser = async () => {
    let decodedToken = await getDecodedToken();
    let user = decodedToken?.userData?.user;
    if (user) {
      setname(user.name);
    }
  };

  useEffect(() => {
    setSignInModal(false);
    handleNestedcategories();
    if (getToken()) {
      handleGetUser();
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (userObj && userObj?._id) {
      handleGetProducts();
    }
  }, [userObj]);

  const handlesendOtp = async () => {
    try {
      if (loginByEmail) {
        if (`${email}` === "") {
          errorToast("Please Enter email");
          return;
        }
        if (!`${email}`.includes("@")) {
          errorToast("Please Enter a valid email");
          return;
        }
        if (!`${email}`.includes(".")) {
          errorToast("Please Enter a valid email");
          return;
        }
      } else {
        if (`${mobile}`.length !== 10) {
          errorToast("Please Enter Mobile Number");
          return;
        }
      }
      let obj = {
        phone: mobile,
        email: email,
      };

      // console.log(obj,"gdfgdkfdgfadfdfdkjdhfjkdafhfdkjkskjafhdkjhsjk",)
      // dispatch(otpSend(obj));
      // setotpsent(true);

      let { data: res } = await sentOtp(obj);
      if (res.message) {
        successToast(res.message);
        setotpsent(true);
      }
    } catch (error) {
      errorToast(error);
      console.log(error);
    }
  };

  const resendOtp = async () => {
    try {
      if (`${mobile}` === "") {
        errorToast("Please Enter Mobile Number");
        return;
      }

      let obj = {
        phone: mobile,
        // email: email,
      };

      // dispatch(otpSend(obj));

      let { data: res } = await sentOtp(obj);
      if (res.message) {
        successToast(res.message);
        // setotpsent(true)
      }
    } catch (error) {
      errorToast(error);
      console.log(error);
    }
  };

  useEffect(() => {
    if (tempLoginObj) {
      if (tempLoginObj && tempLoginObj.isOtpSent) {
        // setotpsent(true);
      }
    }
  }, [tempLoginObj]);

  const handlesLogin = async () => {
    if (`${otp}` === "") {
      errorToast("Please Enter Otp");
      return;
    }
    let obj = {
      phone: mobile,
      otp,
    };
    dispatch(login(obj));
    setSignInModal(false);
  };


  const handlesettopusers = async () => {
    try {


      let { data: res } = await gettopUsers();
      if (res.data) {
        // console.log("res.data", res.data);

        settopusers(res.data);
      }
    } catch (err) {
      errorToast(err);
    }
  };
  useEffect(() => {
    handlesettopusers();
  }, []);


  return (
    <main>

      <style>
        {`
          .swiper-slide {
            margin-right: 15px !important;
          }
        `}
      </style>

      <section className="">
        <div className="container-fluid">
          <div className="row">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{ disableOnInteraction: false }}
              speed={1500}
              loop
            >
              {homepageBannersArr &&
                homepageBannersArr.length > 0 &&
                homepageBannersArr.map((el, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className="col-12"

                        onClick={() => {
                          // Handle navigation based on the type
                          if (el.type === 'productbanner') {
                            navigate(`/ShopDetail/${el.productId.slug}`); // Navigate to /product
                          } else if (el.type === 'profilebanner' && el.userId) {
                            navigate(`/Supplier/${el.userId._id}`); // Navigate to /user/:userId
                          } else if (el.type === 'Adminbanner' && el.url) {
                            window.open(el.url); // Open the external URL
                          } else {
                            window.open(el.url, '_blank');
                          }
                        }}>
                        <img
                          src={generateImageUrl(el.image)}
                          alt=""
                          className="img sliderimg"
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
        </div>
      </section>

      <section className="category">
        <Container fluid className="categoriesback p-0 p-lg-5">
          <div className="container">
            <div className="title-section with-btn mb-0 mb-lg-5 py-3 py-lg-0">
              <h1 className="heading "> Categories </h1>
            </div>
          </div>
          <Row>
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{ disableOnInteraction: false }}
              speed={1500}
              loop
              breakpoints={{
                0: {
                  slidesPerView: 2,
                },
                576: {
                  slidesPerView: 3,
                },
                992: {
                  slidesPerView: 3,
                },
                1200: {
                  slidesPerView: 6,
                },
                1300: {
                  slidesPerView: 6,
                },
                1400: {
                  slidesPerView: 7,
                },
                1700: {
                  slidesPerView: 7,
                },
              }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
            >
              <div>
                {categoryArr &&
                  categoryArr
                    .filter(
                      (el, index) =>
                        index <= (isDisplayingAll ? categoryArr.length - 1 : 10)
                    )
                    .map((item, index) => (
                      <SwiperSlide key={index}>
                        <Link to={`Shop?categories=${item._id}`}>
                          <Col className="d-grid text-center align-items-center justify-content-center">
                            <div className="d-grid align-items-center justify-content-center">
                              <img
                                src={generateImageUrl(item.image)}
                                className="img-fluid ctimg "
                                alt={item.name}
                              />
                            </div>
                            <p className="fw-bolder fs-6">{item.name}</p>
                          </Col>
                        </Link>
                      </SwiperSlide>
                    ))}
              </div>
              {/* <div className="swiper-button-next "></div> */}
              {/* <div className="swiper-button-prev"></div> */}
            </Swiper>
          </Row>
        </Container>
      </section>

      {/* <section>
        <Container fluid>
          <div className="container">
            <div className="title-section mb-5">
              <h1 className="heading text-start ">Products May You Like</h1>
            </div>
          </div>
          <Row className="d-flex  justify-content-center ">
            <Col
              lg={2}
              xs={5}
              className="prdcrd d-grid align-items-center justify-content-center mx-lg-3 mx-0 mt-5 mt-lg-0 px-0"
            >
              <img src={grlm} alt="" className=" img-fluid" />
              <div className=" d-flex justify-content-center">
                <LuPhoneCall className="phn rounded-circle p-2 " />
              </div>
              <h4 className=" text-center fw-bolder">Greenlam Laminates</h4>
              <p className="text-center">
                <img src={location} alt="" />
                Chennai
              </p>
              <div className=" d-flex justify-content-center">
                <button className="text-center fs-5 fw-bold text-white prdbtn px-4 py-2">
                  Get Quote
                </button>
              </div>
            </Col>
            <Col
              lg={2}
              xs={5}
              className="prdcrd d-grid align-items-center justify-content-center mx-lg-3 mx-0 mt-5 mt-lg-0 px-0"
            >
              <img src={grlm} alt="" className=" img-fluid" />
              <div className=" d-flex justify-content-center">
                <LuPhoneCall className="phn rounded-circle p-2 " />
              </div>
              <h4 className=" text-center fw-bolder">Greenlam Laminates</h4>
              <p className="text-center">
                <img src={location} alt="" />
                Chennai
              </p>
              <div className=" d-flex justify-content-center">
                <button className="text-center fs-5 fw-bold text-white prdbtn px-4 py-2">
                  Get Quote
                </button>
              </div>
            </Col>
            <Col
              lg={2}
              xs={5}
              className="prdcrd d-grid align-items-center justify-content-center mx-lg-3 mx-0 mt-5 mt-lg-0 px-0"
            >
              <img src={grlm} alt="" className=" img-fluid" />
              <div className=" d-flex justify-content-center">
                <LuPhoneCall className="phn rounded-circle p-2 " />
              </div>
              <h4 className=" text-center fw-bolder">Greenlam Laminates</h4>
              <p className="text-center">
                <img src={location} alt="" />
                Chennai
              </p>
              <div className=" d-flex justify-content-center">
                <button className="text-center fs-5 fw-bold text-white prdbtn px-4 py-2">
                  Get Quote
                </button>
              </div>
            </Col>
            <Col
              lg={2}
              xs={5}
              className="prdcrd d-grid align-items-center justify-content-center mx-lg-3 mx-0 mt-5 mt-lg-0 px-0"
            >
              <img src={grlm} alt="" className=" img-fluid" />
              <div className=" d-flex justify-content-center">
                <LuPhoneCall className="phn rounded-circle p-2 " />
              </div>
              <h4 className=" text-center fw-bolder">Greenlam Laminates</h4>
              <p className="text-center">
                <img src={location} alt="" />
                Chennai
              </p>
              <div className=" d-flex justify-content-center">
                <button className="text-center fs-5 fw-bold text-white prdbtn px-4 py-2">
                  Get Quote
                </button>
              </div>
            </Col>
          </Row>
          <div className="d-flex  justify-content-center mt-5">
            <button className=" border-0 rounded-5 px-4 py-3 vvall text-white fw-bold fs-5">
              View All
            </button>
          </div>
        </Container>
      </section> */}

      <section className=" mt-2">
        <Container fluid className="product-container-section">
          <h1 className="heading text-center">Products You May Like</h1>
          <Row>
            <Swiper
              modules={[Autoplay]}
              spaceBetween={5}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              speed={1500}
              breakpoints={states}
            >


              {productArr &&
                productArr.slice(0, 10).map((product, index) => (
                  <SwiperSlide key={index}>
                    <Col
                      key={index}
                      className="d-flex productyoulike justify-content-center align-items-center py-4 px-0 mx-0"

                    >
                      <div className="box_Product1 ">


                        <img src={generateImageUrl(product.mainImage)} alt={product.name} className="img-fluid ims img1" />

                        <span
                          className="icn_Product"
                          onClick={() => {
                            if (!isAuthorized) {
                              // If the user is not authorized, show the sign-in modal
                              setSignInModal(true);
                            } else if (!currentUserHasActiveSubscription) {
                              // If the user does not have an active subscription, show the price modal
                              handleClose(true);
                            } else {
                              // If the user has an active subscription, initiate a phone call
                              window.location.href = `tel:${product.phone}`;
                            }
                          }}
                        >
                          <LuPhoneCall />
                        </span>

                        <div className="product_detail">
                          <Link to={`/ShopDetail/${product?.slug}`}>

                            <span className=" msg1">{product.name}</span>
                            <span className="chennai">
                              <IoLocationSharp /> {product.cityName}
                            </span>
                            <span className=" msg1">{product.sellingprice}</span>
                          </Link>
                        </div>
                        <Link to={`/ShopDetail/${product?.slug}`}>            <button className="mt-2 fs-6 fw-bold">Get Quote</button></Link>


                      </div>
                    </Col>
                  </SwiperSlide>
                ))}
            </Swiper>
          </Row>
          <div className="d-flex justify-content-center align-items-center mb-0 mb-lg-5">
            <Link to={`/product-details`}>
              <button
                className="border-0 rounded-5 px-4 py-3 vvall text-white fw-bold fs-5"
                style={{ backgroundColor: "rgba(96, 50, 0, 1)" }}

              >
                View All
              </button>
            </Link>
          </div>
        </Container>
      </section>
      <div className=" my-4 d-none d-lg-block" style={{ height: "2px" }}></div>
      <section className=" mt-0  mt-lg-5">
        <Container className=" mt-0 mt-lg-5">
          <Row className=" newpeoductback ">
            <Col lg={9} xs={12} className="newprdrw">
              <Swiper
                modules={[Autoplay, Navigation]}
                spaceBetween={20}
                slidesPerView={5}
                autoplay={{ disableOnInteraction: false }}
                speed={1500}
                breakpoints={fretureprod}
              >
                {advertisementsArr &&
                  advertisementsArr.map((el, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <div className="vender-box">
                          <div className="newprdcrd">
                            <img
                              src={el.image ? generateImageUrl(el.image) : grls}

                              className="img-fluid img1"
                            />
                            <div className="d-flex justify-content-center">


                              <span className="phone-icon"
                                onClick={() => {
                                  if (!isAuthorized) {
                                    // If the user is not authorized, show the sign-in modal
                                    setSignInModal(true);
                                  } else if (!currentUserHasActiveSubscription) {
                                    // If the user has an active subscription, close the modal
                                    handleClose(true);
                                  } else {
                                    // If the user does not have an active subscription, show the price modal
                                    window.location.href = `tel:${el.phone}`;
                                  }
                                }}

                              > <LuPhoneCall className="phn rounded-circle p-2" /></span>
                            </div>
                            <h6 className="fs-6 msg1" >{el.message}</h6>
                            <button
                              onClick={() =>
                                navigate(`/ShopDetail/${el?.productSlug}`)
                              }
                              className="newprdbtn py-2 text-white"
                            >
                              Get Quotes
                            </button>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}

                {/* Add Products Button on the Last Slide */}
                <SwiperSlide>
                  {/* <div className="addfrmmain">
                    <Link to="/AddPromotions" className="addfrm fs-6 p-2">
                      
                    </Link>
                  </div> */}
                </SwiperSlide>
              </Swiper>
            </Col>
            <Col
              lg={3}
              className="  d-lg-flex d-none align-items-center "
              onClick={() => {
                if (!isAuthorized) {
                  // If the user is not authorized, show the sign-in modal
                  setSignInModal(true);
                } else if (!currentUserHasActiveSubscription) {
                  // If the user has an active subscription, close the modal
                  handleClose(true);
                } else {
                  // If the user does not have an active subscription, show the price modal
                  navigate("/AddPromotions")
                }
              }}
            >
              <div className=" newprdround fs-1  text-white rounded-circle p-3 text-center d-grid align-items-center ">
                Add
                <br />
                New Arrivals
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container className="main_Profiles my-2 my-lg-5">
          <h1 className="text-center mb-4">Top Profiles</h1>
          <Row className=" d-flex justify-content-center">
            {topusers && topusers.slice(0, 4).map((el) => (
              <Col lg={3} xs={6} className="py-3 px-2">
                {/* <Link to={`/Supplier/${el?._id}`}> */}
                <div className="component-container1  text-center">

                  {el?.bannerImage ? (
                    <img
                      src={generateImageUrl(el?.bannerImage)}
                      alt=""
                      className=" img-fluid img"
                    />
                  ) : (
                    <img
                      src={images.category_6}
                      alt=""
                      className=" img-fluid img"
                    />
                  )}

                  <div className="sub-container1">
                    <span className=""> <Link to={`/Supplier/${el?._id}`}>
                      {el?.companyName
                        ? el?.companyName
                        : el?.name}
                    </Link></span>
                    <span className="">
                      Products:{" "}
                      {el?.productsCount
                        ? el?.productsCount
                        : "N.A."}
                    </span>
                  </div>
                  <div className="sub-container2">
                    {/* <span className="ps-5">Rating - {el?.rating ? el?.rating : 0}</span> */}

                    <span className="ratingcount">
                      Rating :  {el?.rating
                        ? [...Array(Math.round(el.rating))].map((_, index) => <IoStar key={index} className="ratingicon" />)
                        : <IoStar />}
                    </span>

                    {/* <li className="my-2">
                      <div className="icon brown pe-2 fs-5">
                        {Array.from({ length: rating.rating }, (_, index) => (
                          <BsStarFill key={index} />
                        ))}
                      </div>
                    </li> */}

                    <span className="phone-icon"
                      onClick={() => {
                        if (!isAuthorized) {
                          // If the user is not authorized, show the sign-in modal
                          setSignInModal(true);
                        } else if (!currentUserHasActiveSubscription) {
                          // If the user has an active subscription, close the modal
                          handleClose(true);
                        } else {
                          // If the user does not have an active subscription, show the price modal
                          window.location.href = `tel:${el.phone}`;

                        }
                      }}

                    > <LuPhoneCall /></span>
                  </div>


                </div>
                {/* </Link> */}
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <div className=" my-4 d-none d-lg-block" style={{ height: "2px" }}></div>

      {
        flashSalesArr && flashSalesArr.length > 0 && (
          <section className=" mt-0 mt-lg-5">
            <Container className=" mt-0 mt-lg-5 ">
              <Row className=" flashpeoductback d-lg-flex  justify-content-center ">
                <Col
                  lg={3}
                  xs={8}
                  className="  d-lg-flex  justify-content-center align-items-center "
                  onClick={() => navigate("/AddFlashSale")}
                >
                  <img src={img4} className=" img-fluid " alt="" />{" "}
                </Col>
                <Col lg={9} xs={12} className="newprdrw">
                  <Swiper
                    modules={[Autoplay]}
                    spaceBetween={5}
                    autoplay={{ disableOnInteraction: false }}
                    speed={1500}
                    breakpoints={flashsale}
                  >
                    {flashSalesArr &&
                      flashSalesArr.length > 0 &&
                      flashSalesArr.map((el, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <div className="newprdcrd text-center position-relative">
                              <div className="position-relative">
                                <CountdownTimer targetDate={el.endDate} />
                                <Link to={`/ShopDetail/${el?.productId?.slug}`}>
                                  <img
                                    src={generateImageUrl(el.productId.mainImage)}
                                    alt=""
                                    className="img-fluid ims img1 "
                                  />
                                  <div className="overlyasper"></div>
                                </Link>
                              </div>

                              <span
                                className="icn_Product"
                                onClick={() => {
                                  if (!isAuthorized) {
                                    // If the user is not authorized, show the sign-in modal
                                    setSignInModal(true);
                                  } else if (!currentUserHasActiveSubscription) {
                                    // If the user does not have an active subscription, show the price modal
                                    handleClose(true);
                                  } else {
                                    // If the user has an active subscription, initiate a phone call
                                    window.location.href = `tel:${el.userId?.companyObj?.phone}`;
                                  }
                                }}
                              >
                                <LuPhoneCall className="phn rounded-circle p-1" />
                              </span>




                              <h6 className=" text-center  prdtitle mt-3">
                                <Link to={`/ShopDetail/${el?.productId?.slug}`}>
                                  {el?.productId?.name}
                                </Link>
                              </h6>


                              <div>
                                <h6 className="old">
                                  <span className="prize"><del>₹{el?.price}</del>/-   &nbsp; &nbsp; <span style={{ fontSize: "23px" }}>₹{el?.salePrice}/- </span><span style={{ fontSize: "12px" }}>{el.pricetype}</span></span>
                                </h6>
                              </div>
                              <button
                                onClick={() =>
                                  navigate(`/ShopDetail/${el?.productId?.slug}`)
                                }
                                className="newprdbtn py-2 text-white"
                              >
                                Get Quotes
                              </button>

                            </div>
                            <div className=" discountnew fw-bold text-center d-grid align-items-center ">
                              <div className="">{el.discountValue}%

                                {/* <span style={{ fontSize: "8px" }}>OFF</span>  */}
                              </div>
                            </div>



                          </SwiperSlide>



                        );

                      })}
                    {/* <SwiperSlide>
                      <div className="addfrmmain">
                        <Link to="/AddFlashSale" className="addfrm p-2">
                          +
                        </Link>
                      </div>
                    </SwiperSlide> */}
                  </Swiper>
                </Col>
              </Row>
            </Container>
          </section>
        )
      }

      <section style={{ backgroundColor: "#F5F1E8" }}>
        <p className="text-center fw-bold m-3" style={{ fontSize: "55px" }}>
          States
        </p>
        <Container fluid className=" px-1 px-lg-5 text-center fw-bold">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={5}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            speed={1500}
            breakpoints={states}
          >
            {stateDetails.map((city, index) => (
              <SwiperSlide key={index}>
                <Link to={`/Shop?state=${city.stateId._id}`}>
                  <div>
                    <img
                      src={city.image ? generateImageUrl(city?.image) : img1}
                      alt={city.name}
                      className="img-fluid ims img1"
                    />
                    {/* <img src={generateImageUrl(city?.image)} alt={city.name} className="img-fluid ims img1" /> */}
                    <p className="text-center">{city.stateId.name}</p>

                  </div></Link>

              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </section>
      <Container fluid>
        <Row className="h1 justify-content-center text-center mb-2 mb-lg-5 fs-3 text-black fw-bold mt-3 mt-lg-5" >
          Dealership / Franchise <br />
          Opportunities
        </Row>
      </Container>
      {/* <section onClick={() => !isAuthorized ? setSignInModal(true) : navigate('/AddDealership')}> */}
      <section onClick={() => {
        if (!isAuthorized) {
          // If the user is not authorized, show the sign-in modal
          setSignInModal(true);
        } else if (!currentUserHasActiveSubscription) {
          // If the user has an active subscription, close the modal
          handleClose(true);
        } else {
          // If the user does not have an active subscription, show the price modal
          navigate('/AddDealership')
        }
      }}>

        <img src={playbanner} className=" img-fluid  " alt="" height={'60px'} />
      </section>





      <section>
        <Container className="dealership-oppo-container my-2 my-lg-5">

          <>

            <Row>
              <Swiper
                modules={[Autoplay]}
                spaceBetween={5}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                speed={1500}
                breakpoints={ourvideos}
              >
                {opportunities.map(opportunity => (

                  <SwiperSlide >
                    <Col xs={6} lg={3} key={opportunity._id} className="dealership-oppo-sub-container x" >
                      <div className="dealership-oppo-box rounded-5 rounded">
                        <div
                          className={`dealership-oppo-img-box ${opportunity.image ? `img-${opportunity.image}` : 'default-img'}`}
                          style={{
                            backgroundImage: `url(${generateImageUrl(opportunity.image)})`
                          }}
                        >

                          <div className="dealership-oppo-text-box-1 p-0 pt-4 py-4 row">
                            <div className=" col-lg-7">
                              <span>{opportunity.Organisation_name}</span> <br />
                            </div>

                            {/* <div className=" col-lg-5"><button className="dealerapply px-3 py-2" onClick={() => navigate('/ApplyDealership', { state: { opportunity } })}  >Apply</button></div> */}

                            <div className="col-lg-5">
                              <button className="dealerapply px-3 py-2"
                                onClick={() => {
                                  // If the user has an active subscription, initiate a phone call
                                  navigate('/ApplyDealership', { state: { opportunity } });

                                }}
                              >
                                Apply
                              </button>
                            </div>



                          </div>


                        </div>

                      </div>
                    </Col></SwiperSlide>
                ))}
              </Swiper>
            </Row>
          </>

        </Container>
      </section>

      <Container fluid className="main-blog">
        <div className="blog2 new_blog2 blog_container top-banner ptb-80">
          <div className="container-fluid d-flex justify-content-center align-items-center">
            <div className="row overlayflowscroll">
              <div
                className={`tab col-lg-2 col-12 ${showBlogs == true ? "active-tab" : "in-active"
                  }`}
                onClick={() => setShowBlogs(true)}
              >
                <div className="blog2_heading">News</div>
              </div>
              &nbsp;
              <div
                className={`tab col-lg-2 col-12 ${showBlogs == false ? "active-tab" : "in-active"
                  }`}
                onClick={() => setShowBlogs(false)}
              >
                <div className="blog2_heading">Video</div>
              </div>
            </div>
          </div>
        </div>

        <div className="blog2 new_blog2 blog_container ">
          <div className="container-fluid">

            {showBlogs ? (
              <div className="row news-1">
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={5}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  speed={1500}
                  breakpoints={ourvideos}
                >
                  {blogsArr &&
                    blogsArr.length > 0 &&
                    blogsArr.map((el, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <div
                            key={index}
                            className=" d-flex justify-content-center align-items-center"
                          >
                            <div className="blog_listing">
                              <div className="blog_listing_img">
                                <img
                                  src={generateImageUrl(el.image)}
                                  alt=""
                                  className="img-fluid blogImage"
                                />
                              </div>
                              <div className="list_content_blog">
                                <h6>{el?.name.slice(0, 40)}</h6>
                                {/* <h4> How to Secure Your Ecommerce Website from Cyberattacks</h4> */}
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: el?.description.slice(0, 100),
                                  }}
                                ></div>
                                <Link
                                  to={`/blog-detail/${el._id}`}
                                  className="btn blog_readmore"
                                >
                                  Read More <BsArrowRight className="blog_arrow" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div>

            ) : (
              <div className="row video-2">
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={5}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  speed={1500}
                  breakpoints={ourvideos}
                >
                  {blogVideoArr &&
                    blogVideoArr.length > 0 &&
                    blogVideoArr.map((el, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <div
                            key={index}
                            className=" d-flex justify-content-center align-items-center"
                          >
                            <div className="blog_listing">
                              <div className="blog_listing_img">
                                {/* {el.url} */}
                                {el.url && el.url.includes("http") && (
                                  <iframe
                                    src={el.url}
                                    allowFullScreen
                                    frameborder="0"
                                    className="img-fluid blogImage"
                                  ></iframe>
                                )}
                              </div>

                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div>
            )}
          </div>
        </div>
      </Container>


      <Container fluid className="custom-container">
        <Row className="custom-container-row">
          <Col className="main_col_1">
            <div className="main_conatiner">
              <h1 className="fw-bold">
                Get Free Quotes From Multiple Sellers{" "}
              </h1>
              <div className="custom-leftSection">
                <div className="steps">
                  <div className="step">
                    <div className="icon-box">
                      <IoMdMailOpen />
                    </div>
                    <div className="para1">
                      Tell Us What <br /> You Need
                    </div>
                  </div>
                  <div className="step">
                    <div className="icon-box">
                      <BiSolidMessage />
                    </div>
                    <div className="para1">
                      Receive Free <br /> Quotes From <br /> Sellers
                    </div>
                  </div>
                  <div className="step">
                    <div className="icon-box">
                      <MdThumbUp />
                    </div>
                    <div className="para1">
                      Seal The <br /> Deal
                    </div>
                  </div>
                </div>
                <img className="Man-image" src={mancrp} alt="" />
              </div>
            </div>
          </Col>
          <Col className="main_col_2">
            <Table className="custom-form">
              <Col className="col_1">
                <h2 className="right-h2">TELL US YOUR REQUIREMENT</h2>
              </Col>
              <Col className="col_2">
                <div className="custom-form-input-container">
                  <Form.Group
                    controlId="formName"
                    className="custom-input-group"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Name*"
                      className="custom-input"
                      value={Name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="formMobile"
                    className="custom-input-group"
                  >
                    <Form.Control
                      type="tel"
                      placeholder="Mobile No.*"
                      className="custom-input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="formAddress"
                    className="custom-input-group"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Address*"
                      className="custom-input"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="formProduct"
                    className="custom-input-group"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Product / Service*"
                      className="custom-input"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </Form.Group>
                </div>
              </Col>
              <Col className="col_3">
                <Button
                  type="submit"
                  className="submit-button"
                  onClick={(e) => handleSubmitRequirement(e)}
                >
                  SUBMIT
                </Button>
              </Col>
            </Table>
          </Col>
        </Row>
      </Container>
      <Modal show={signInModal} centered onHide={() => setSignInModal(false)} className="rounded-5">
        <Modal.Body className="sign-in-modal custom-modal subscription-card-container rounded-5">
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            onClick={() => setSignInModal(false)}
          ></button>
          <div>
            <Link to="/" className="navbar-brand">
              <img src={images.logo} alt="" className="main-logo img-fluid" />
            </Link>
          </div>
          <h2 className="heading">LogIn via</h2>
          <form className="form row">
            {/* <label>Login via </label> */}
            {/* {otpsent == false && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 20,
                  marginTop: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="radio"
                    name="type2"
                    id="222"
                    // value={true}
                    checked={loginByEmail}
                    onChange={(e) => setLoginByEmail(true)}
                  />
                  <label for="222" className="mx-2">
                    Email
                  </label>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="radio"
                    name="type2"
                    id="223"
                    checked={!loginByEmail}
                    onChange={(e) => setLoginByEmail(false)}
                  />
                  <label for="223" className="mx-2">
                    Phone
                  </label>
                </div>
              </div>
            )} */}

            {loginByEmail ? (
              <div className="col-12">
                {otpsent ? (
                  <div className="input flex-1">
                    <label className="text-start">
                      Enter OTP sent to {mobile}
                    </label>
                    <input
                      type="text"
                      className="w-100 form-control bg-grey"
                      placeholder="Enter Your OTP"
                      value={otp}
                      onChange={(e) => setotp(e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="input flex-1">
                    <label className="text-start">Email</label>
                    <input
                      type="text"
                      className="w-100 form-control bg-grey"
                      placeholder="Enter Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="col-12">
                {otpsent ? (
                  <div className="input flex-1">
                    <label className="text-start">
                      Enter OTP sent to {mobile}
                    </label>
                    <input
                      type="text"
                      className="w-100 form-control bg-grey"
                      placeholder="Enter Your OTP"
                      value={otp}
                      onChange={(e) => setotp(e.target.value)}
                    />

                    <div className="text-end">
                      <div
                        className="resendtp"
                        onClick={() => {
                          resendOtp();
                        }}
                      >
                        Resend OTP
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="input flex-1">
                    <label className="text-start">Phone number</label>
                    <input
                      type="number"
                      maxLength={10}
                      className="w-100 form-control bg-grey"
                      placeholder="Enter Your Mobile Number"
                      value={mobile}
                      onChange={(e) => setmobile(e.target.value)}
                    />
                  </div>
                )}
              </div>
            )}

            <div className="col-12">
              {otpsent ? (
                <button
                  type="button"
                  onClick={() => {
                    handlesLogin();
                  }}
                  className="btn btn-custom text-white yellow-bg py-2 w-100"
                >
                  Verfiy
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    handlesendOtp();
                  }}
                  className="btn btn-custom text-white yellow-bg py-2 w-100"
                >
                  Submit
                </button>
              )}

              <Link
                to="/Register"
                onClick={() => {
                  handleRegister();
                }}
                className="btn btn-custom mt-2 text-white yellow-bg py-2 w-100"
              >
                Register Now
              </Link>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={show} centered onHide={() => setShow(false)} className="  rounded-5">


        <Modal.Body className="sign-in-modal custom-modal subscription-card-container">
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            onClick={() => setShow(false)}
          ></button>
          <h4 className=" mt-5"><b>You do not have a valid subscription</b></h4>

          <button
            className="btn btn-custom btn-yellow mt-2 mb-4"
            onClick={() => navigate("/Subscription")}
          >
            Subscribe Now
          </button>
        </Modal.Body>
      </Modal>


    </main >
  );
}

export default Index;
