import React, { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";
import { FaArrowUp, FaHandshake } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { MdCall } from "react-icons/md";
import { RiMessage2Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
import { fetchToken } from "../firebase";
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
import { addUserRequirement } from "../services/UserRequirements.service";
import { getHomePageBannersApi } from "../services/homepageBanners.service";
import { generateImageUrl } from "../services/url.service";
import { toastSuccess } from "../utils/toastutill";
import CountdownTimer from "./Utility/CountdownTimer";
import { errorToast } from "./Utility/Toast";
import Ellipse from "../assets/image/home/Ellipse 27.png";
import playbanner from "../assets/image/home/Group 1000004149.png";
import { FaPhoneVolume } from "react-icons/fa6";
import icon1 from "../assets/image/home/images/1.png";
import mancrp from "../assets/image/home/images/mancrp.png";
import { IoMdMailOpen } from "react-icons/io";
import { BiSolidMessage } from "react-icons/bi";
import { MdThumbUp } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import greenimg from "../assets/image/home/images/greenlam1.png";
import "../assets/css/Blog.css"

function Index() {
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [categoryArr, setcategoryArr] = useState([]);
  const [brandArr, setbrandArr] = useState([]);
  const [flashSalesArr, setFlashSalesArr] = useState([]);
  const auth = useSelector((state) => state.auth.user);
  const mainAuthObj = useSelector((state) => state.auth);
  let role = useSelector((state) => state.auth.role);
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);

  const [homepageBannersArr, setHomepageBannersArr] = useState([]);

  const [isDisplayingAll, setIsDisplayingAll] = useState(false);
  const [isMobileNumberVisible, setIsMobileNumberVisible] = useState(false);
  const [
    currentUserHasActiveSubscription,
    setCurrentUserHasActiveSubscription,
  ] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [productName, setProductName] = useState("");
  const [advertisementsArr, setAdvertisementsArr] = useState([]);

  const [signInModal, setSignInModal] = useState(false);

  const getUserFcmToken = async () => {
    try {
      let temp = await fetchToken();
      console.log(temp);
      if (mainAuthObj?.isAuthorized) {
        let { data: res } = await registerUserFcmToken({
          fcmToken: temp,
          userId: mainAuthObj?.user?._id,
        });
        console.log(res, "TOKEN RES");
      }
    } catch (error) {
      // console.error(error);
    }
  };

  useEffect(() => {
    getUserFcmToken();
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

  // const [blogsArr, setBlogsArr] = useState([]);
  // const [blogVideoArr, setBlogVideoArr] = useState([]);

  // const handleGetBlogs = async () => {
  //   try {
  //     let { data: res } = await getBlogApi();
  //     if (res.data) {
  //       setBlogsArr(res.data);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleGetBlogVideo = async () => {
  //   try {
  //     let { data: res } = await getBlogVideoApi();
  //     if (res.data) {
  //       setBlogVideoArr(res.data);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   handleGetBlogs();
  //   handleGetBlogVideo();
  // }, []);

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
      console.log(res, "====<>");
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
      let enddate = `${date.getFullYear()}-${
        (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1)
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
        console.log(res.data, "res.data");
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
        console.log(res.data, "data");
        setAdvertisementsArr(res.data);
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const handleGetHomepageBanners = async () => {
    try {
      let { data: res } = await getHomePageBannersApi();
      if (res.data) {
        console.log(res.data, "data");
        setHomepageBannersArr(res.data);
      }
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
      slidesPerView: 5,
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
  const [showBlogs, setShowBlogs] = useState(true);
  const [blogVideoArr, setBlogVideoArr] = useState([]);

  const handleGetBlogs = async () => {
      try {
          let { data: res } = await getBlogApi();
          if (res.data) {
              setBlogsArr(res.data);
          }
      }
      catch (err) {
          console.log(err)
      }
  }


  const handleGetBlogVideo = async () => {
      try {
          let { data: res } = await getBlogVideoApi();
          if (res.data) {
              setBlogVideoArr(res.data);
          }
      }
      catch (err) {
          console.log(err)
      }
  }


  useEffect(() => {
      handleGetBlogs()
      handleGetBlogVideo()
  }, [])


  return (
    <main>
      <section className="mb-80">
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
                      <div className="col-12">
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

      <section className="category mb-80">
        <Container fluid className="categoriesback p-5">
          <div className="container">
            <div className="title-section with-btn mb-5">
              <h1 className="heading "> Categories</h1>
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
                1400: {
                  slidesPerView: 8,
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
                        index <= (isDisplayingAll ? categoryArr.length - 1 : 5)
                    )
                    .map((item, index) => (
                      <SwiperSlide key={index}>
                        <Link to={`Shop?categories=${item._id}`}>
                          <Col className="d-grid text-center align-items-center justify-content-center">
                            <div className="categoriescircle rounded-circle ctimg d-grid align-items-center justify-content-center">
                              <img
                                src={generateImageUrl(item.image)}
                                className="p-4 img-fluid"
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
                  1 Get Deal
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
                  1 Get Deal
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
                  1 Get Deal
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
                  1 Get Deal
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

      <section>
        <Container className="product-container-section">
          <h1 className="heading text-center">Products May You Like</h1>
          <Row>
            <Col className="d-flex justify-content-center align-items-center py-4" xxl={3} xl={3} lg={6} md={6} sm={6} xs={6}>
              <div className="box_Product1">
                <img src={greenimg} alt="" />
                <span className="icn_Product">
                  <LuPhoneCall />
                </span>
                <div className="product_icn_text">
                  <span className="green-1">Greenlam Laminates</span>
                  <span className="chennai">
                    <IoLocationSharp /> Chennai
                  </span>
                  <span className="Rs-1">₹3360</span>
                </div>
                <button>1 Get Deal</button>
              </div>
            </Col>
            <Col className="d-flex justify-content-center align-items-center py-4" xxl={3} xl={3} lg={6} md={6} sm={6} xs={6}>
              <div className="box_Product1">
                <img src={greenimg} alt="" />
                <span className="icn_Product">
                  <LuPhoneCall />
                </span>
                <div className="product_icn_text">
                  <span className="green-1">Greenlam Laminates</span>
                  <span className="chennai">
                    <IoLocationSharp /> Chennai
                  </span>
                  <span className="Rs-1">₹3360</span>
                </div>
                <button>1 Get Deal</button>
              </div>
            </Col>
            <Col className="d-flex justify-content-center align-items-center py-4" xxl={3} xl={3} lg={6} md={6} sm={6} xs={6}>
              <div className="box_Product1">
                <img src={greenimg} alt="" />
                <span className="icn_Product">
                  <LuPhoneCall />
                </span>
                <div className="product_icn_text">
                  <span className="green-1">Greenlam Laminates</span>
                  <span className="chennai">
                    <IoLocationSharp /> Chennai
                  </span>
                  <span className="Rs-1">₹3360</span>
                </div>
                <button>1 Get Deal</button>
              </div>
            </Col>
            <Col className="d-flex justify-content-center align-items-center py-4" xxl={3} xl={3} lg={6} md={6} sm={6} xs={6}>
              <div className="box_Product1">
                <img src={greenimg} alt="" />
                <span className="icn_Product">
                  <LuPhoneCall />
                </span>
                <div className="product_icn_text">
                  <span className="green-1">Greenlam Laminates</span>
                  <span className="chennai">
                    <IoLocationSharp /> Chennai
                  </span>
                  <span className="Rs-1">₹3360</span>
                </div>
                <button>1 Get Deal</button>
              </div>
            </Col>
          </Row>
          <div className="d-flex justify-content-center align-items-center mt-3">
            <button className="border-0 rounded-5 px-4 py-3 vvall text-white fw-bold fs-5" style={{backgroundColor:"rgba(96, 50, 0, 1)"}}>
              View All
            </button>
          </div>
        </Container>
      </section>

      <section className=" mt-5 ">
        <Container className=" mt-5 ">
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
                              src={generateImageUrl(el.image)}
                              alt=""
                              className="img-fluid"
                            />
                            <div className="d-flex justify-content-center">
                              <LuPhoneCall className="phn rounded-circle p-2" />
                            </div>
                            <h6 className="fs-6">{el.message}</h6>
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
                  <div className="addfrmmain">
                    <Link to="/AddPromotions" className="addfrm p-2">
                      +
                    </Link>
                  </div>
                </SwiperSlide>
              </Swiper>
            </Col>
            <Col
              lg={3}
              className="  d-lg-flex d-none align-items-center "
              onClick={() => navigate("/AddPromotions")}
            >
              <div className=" newprdround fs-1  text-white rounded-circle p-3 text-center  ">
                New Arrivals
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container className="main_Profiles my-5">
          <h1 className="text-center mb-4">Top profiles</h1>
          <Row>
            <Col
              className="d-flex justify-content-center align-items-center py-4"
              xxl={3}
              xl={6}
              lg={6}
              md={6}
              sm={6}
              xs={6}
            >
              <div className="component-container1">
                <img src={icon1} alt="" className="img" />
                <div className="sub-container1">
                  <span className="p1">Keshav Enterprise</span>
                  <span className="p2">
                    Product - <span>N.A</span>
                  </span>
                </div>
                <div className="sub-container2">
                  <span className="p3">Rating - 4.5</span>
                  <span className="phone-icon">
                    <FaPhoneVolume />
                  </span>
                </div>
              </div>
            </Col>
            <Col
              className="d-flex justify-content-center align-items-center py-4"
              xxl={3}
              xl={6}
              lg={6}
              md={6}
              sm={6}
              xs={6}
            >
              <div className="component-container1">
                <img src={icon1} alt="" className="img" />
                <div className="sub-container1">
                  <span className="p1">Keshav Enterprise</span>
                  <span className="p2">
                    Product - <span>N.A</span>
                  </span>
                </div>
                <div className="sub-container2">
                  <span className="p3">Rating - 4.5</span>
                  <span className="phone-icon">
                    <FaPhoneVolume />
                  </span>
                </div>
              </div>
            </Col>
            <Col
              className="d-flex justify-content-center align-items-center py-4"
              xxl={3}
              xl={6}
              lg={6}
              md={6}
              sm={6}
              xs={6}
            >
              <div className="component-container1">
                <img src={icon1} alt="" className="img" />
                <div className="sub-container1">
                  <span className="p1">Keshav Enterprise</span>
                  <span className="p2">
                    Product - <span>N.A</span>
                  </span>
                </div>
                <div className="sub-container2">
                  <span className="p3">Rating - 4.5</span>
                  <span className="phone-icon">
                    <FaPhoneVolume />
                  </span>
                </div>
              </div>
            </Col>
            <Col
              className="d-flex justify-content-center align-items-center py-4"
              xxl={3}
              xl={6}
              lg={6}
              md={6}
              sm={6}
              xs={6}
            >
              <div className="component-container1">
                <img src={icon1} alt="" className="img" />
                <div className="sub-container1">
                  <span className="p1">Keshav Enterprise</span>
                  <span className="p2">
                    Product - <span>N.A</span>
                  </span>
                </div>
                <div className="sub-container2">
                  <span className="p3">Rating - 4.5</span>
                  <span className="phone-icon">
                    <FaPhoneVolume />
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {flashSalesArr && flashSalesArr.length > 0 && (
        <section className=" mt-5 ">
          <Container className=" mt-5 ">
            <Row className=" flashpeoductback d-lg-flex  justify-content-center ">
              <Col
                lg={3}
                xs={8}
                className="  d-lg-flex  justify-content-center align-items-center "
                onClick={() => navigate("/AddPromotions")}
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
                          <div className="newprdcrd text-center">
                            <div className="position-relative">
                              <CountdownTimer targetDate={el.endDate} />
                              <Link to={`/ShopDetail/${el?.productId?.slug}`}>
                                <img
                                  src={generateImageUrl(el.productId.mainImage)}
                                  alt=""
                                  className="img-fluid ims"
                                />
                                <div className="overlyasper"></div>
                              </Link>
                            </div>
                            <div
                              className="d-flex justify-content-center"
                              onClick={() => {
                                currentUserHasActiveSubscription
                                  ? window.alert(
                                      `${el?.userId?.companyObj?.phone}`
                                    )
                                  : errorToast("Take subscription");
                              }}
                            >
                              <LuPhoneCall className="phn rounded-circle p-2" />
                            </div>
                            <div className="d-flex justify-content-center">
                              <h6>{el?.description}</h6>
                            </div>
                            <h6 className=" text-center  prdtitle">
                              <Link to={`/ShopDetail/${el?.productId?.slug}`}>
                                {el?.productId?.name}
                              </Link>
                            </h6>
                            <ul className="">
                              <li>
                                {el.discountType == "Percentage"
                                  ? `${el.discountValue}% OFF`
                                  : `Flat ${el.discountValue} OFF`}
                              </li>
                            </ul>
                            <div>
                              <h6 className="old">
                                <span className="prize">₹{el?.price}</span>
                                <span className="small text-muted">
                                  {el.pricetype
                                    ? "/ " + el.pricetype
                                    : "/ Sq ft"}
                                </span>
                              </h6>
                              <h6 className="new">
                                <span className="prize">₹{el?.salePrice}</span>
                                <span className="small text-muted">
                                  {el.pricetype
                                    ? "/ " + el.pricetype
                                    : "/ Sq ft"}
                                </span>
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
                        </SwiperSlide>
                      );
                    })}
                  <SwiperSlide>
                    <div className="addfrmmain">
                      <Link to="/AddPromotions" className="addfrm p-2">
                        +
                      </Link>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </Col>
            </Row>
          </Container>
        </section>
      )}
      {/* {flashSalesArr && flashSalesArr.length > 0 && (
        <section className="flash-sale mb-80 px-4pc gray-bg ptb-80">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-12 col-md-4">
                <div className="flash-sale-box">
                  <div className="title">
                    <h1>FLASH </h1>
                    <h1>SALE</h1>
                  </div>
                  <div className="offer">
                    <h4>Sell your product with </h4>
                    <h4>discounted rate</h4>
                  </div>
                  {isAuthorized && (
                    <Link
                      to="/AddFlashSale"
                      className="btn btn-custom text-white mt-4"
                      style={{
                        borderBottom: "solid 1px white",
                        borderRadius: 1,
                        width: "max-content",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      Add Flash Sale
                    </Link>
                  )}
                </div>
              </div>
              <div className="col-12 col-md-8">
                <div className="view-all text-end mb-4">
                <Link to="/" className="btn btn-custom btn-link-yellow">
                  View All
                </Link>
              </div>
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
                          <div className="newprdcrd">
                            <div className="position-relative">
                              <CountdownTimer targetDate={el.endDate} />
                              <Link to={`/ShopDetail/${el?.productId?.slug}`}>
                                <img
                                  src={generateImageUrl(el.productId.mainImage)}
                                  alt=""
                                  className="img-fluid"
                                />
                                <div className="overlyasper"></div>
                              </Link>


                            </div>
                            <div className="d-flex justify-content-center"
                              onClick={() => {
                                currentUserHasActiveSubscription
                                  ? window.alert(
                                    `${el?.userId?.companyObj?.phone}`
                                  )
                                  : errorToast("Take subscription");
                              }}>
                              <LuPhoneCall className="phn rounded-circle p-2" />
                            </div>
                            <div className="d-flex justify-content-center">
                              <h6>{el?.description}</h6>
                            </div>
                            <h6 className=" text-center  prdtitle">
                              <Link to={`/ShopDetail/${el?.productId?.slug}`}>
                                {el?.productId?.name}
                              </Link>
                            </h6>
                            <ul className="">
                                <li>
                                  {el.discountType == "Percentage"
                                    ? `${el.discountValue}% OFF`
                                    : `Flat ${el.discountValue} OFF`}
                                </li>
                              </ul>
                              <div>
                                <h6 className="old">
                                  <span className="prize">₹{el?.price}</span>
                                  <span className="small text-muted">
                                    {el.pricetype
                                      ? "/ " + el.pricetype
                                      : "/ Sq ft"}
                                  </span>
                                </h6>
                                <h6 className="new">
                                  <span className="prize">
                                    ₹{el?.salePrice}
                                  </span>
                                  <span className="small text-muted">
                                    {el.pricetype
                                      ? "/ " + el.pricetype
                                      : "/ Sq ft"}
                                  </span>
                                </h6>
                              </div>
                            <button
                              onClick={() => navigate(`/ShopDetail/${el?.productId?.slug}`)}
                              className="newprdbtn py-2 text-white"
                            >
                              Get Quotes
                            </button>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div>
            </div>
          </div>
        </section>
      )} */}


      {/* states */}

      <section>
        <img src={playbanner} className=" img-fluid  " alt="" />
      </section>






      <section>
        <Container className="dealership-opportunities-container">
          <Row>Dealership Opportunities</Row>
          <Row>
            <Col>
              <div>
                <div></div>
                <div></div>
              </div>
            </Col>
            <Col>
              <div>
                <div></div>
                <div></div>
              </div>
            </Col>
            <Col>
              <div>
                <div></div>
                <div></div>
              </div>
            </Col>
            <Col>
              <div>
                <div></div>
                <div></div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>










      <section style={{ backgroundColor: "#F5F1E8" }}>
        <p className="text-center fw-bold m-3" style={{ fontSize: "55px" }}>
          States
        </p>
        <Container fluid className=" px-5 text-center fw-bold">
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
            {cities.map((city, index) => (
              <SwiperSlide key={index}>
                <div>
                  <img
                    src={city.imgSrc}
                    className=" img-fluid"
                    alt={city.name}
                  />
                  <p className="text-center">{city.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </section>


      {/* <div className="blog-main-container-1 d-flex flex-wrap flex-column align-items-center gap-5 my-5">
        <div className="tabs">
          <div
            className={`tab ${activeTab === "blog" ? "active" : ""}`}
            onClick={() => handleTabClick("blog")}
          >
            BLOG
          </div>
          <div
            className={`tab ${activeTab === "video" ? "active" : ""}`}
            onClick={() => handleTabClick("video")}
          >
            VIDEO
          </div>
        </div>
        <section className="blog_main d-flex flex-wrap ">
          <Row className="sub_blog  flex-md-row mx-3">
            <Col>
              <div className="sub-div1">
                <img src={Blog1} alt="" />
                <div>
                  {" "}
                  <p>
                    Why Should Plywood <br /> Businesses Choose Our <br />{" "}
                    Platform for Registration? <br />
                    <span>Are you a part of the booming p</span>
                  </p>
                  <button className=" blog_btn ">Read more</button>
                </div>
              </div>
            </Col>
            <Col>
              <div className="sub-div2">
                <img src={Blog2} alt="" />
                <p>
                  Why Should Plywood <br /> Businesses Choose Our <br />{" "}
                  Platform for Registration? <br />
                  <span>Are you a part of the booming p</span>
                </p>
                <button className="blog_btn">Read more</button>
              </div>
            </Col>
          </Row>
          <Row className="second_row d-flex flex-wrap mx-3">
            <Col>
              <iframe
                className="sub-div3"
                width="260"
                height="315"
                src="https://www.youtube.com/embed/T1jcDyJwYvo?si=679kEMy_JvztyTir"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </Col>
            <Col>
              <iframe
                className="sub-div4"
                width="260"
                height="315"
                src="https://www.youtube.com/embed/T1jcDyJwYvo?si=679kEMy_JvztyTir"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </Col>
          </Row>
        </section>
      </div> */}

      {/* <section className="ptb-80 px-4pc">
        <div className="container">
          <div className="title-section with-btn mb-5">
            <h1 className="heading bottom-line brown">Our Blogs</h1>
            <Link to={`/View/blogs`} className="btn btn-custom btn-link-yellow">
              View All
            </Link>
          </div>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            breakpoints={blogbreakpont}
            autoplay={{ disableOnInteraction: false }}
            speed={1500}
          >
            {blogsArr &&
              blogsArr.length > 0 &&
              blogsArr.map((el, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Col>
                      <div className="sub-div1">
                        <img src={generateImageUrl(el.image)} alt="" />
                        <div>
                          {" "}
                          <p>
                            Why Should Plywood <br /> Businesses Choose Our{" "}
                            <br /> Platform for Registration? <br />
                            <span>Are you a part of the booming p</span>
                          </p>
                          <button className=" blog_btn ">Read more</button>
                        </div>
                      </div>
                    </Col>
                    <div>
                      <div className="blog_listing mb-0">
                        <div className="blog_listing_img">
                          <img
                            src={generateImageUrl(el.image)}
                            alt=""
                            className="img-fluid blogImage"
                          />
                        </div>
                        <div className="list_content_blog">
                          <h6>{el?.name}</h6>
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
      </section> */}

      {/* <section className=" gray-bg mb-80  ptb-80 px-4pc">
        <div className="container">
          <div className="title-section with-btn mb-5">
            <h1 className="heading bottom-line brown">Our Videos</h1>
            <Link to={`/View/blogs`} className="btn btn-custom btn-link-yellow">
              View All
            </Link>
          </div>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            breakpoints={ourvideos}
            autoplay={{ disableOnInteraction: false }}
            speed={1500}
          >
            {blogVideoArr &&
              blogVideoArr.length > 0 &&
              blogVideoArr.map((el, index) => {
                return (
                  <SwiperSlide key={index}>
                    {el.url && el.url.includes("http") && (
                      <iframe
                        allowFullScreen
                        src={el.url}
                        frameborder="0"
                        className="img-fluid blogImage"
                      ></iframe>
                    )}
                    <h6 className="text-center">{el?.name}</h6>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </section> */}



      
        <Container fluid className="main-blog">
            <div className="blog2 new_blog2 blog_container top-banner ptb-80">
                <div className="container-fluid d-flex justify-content-center align-items-center">
                    <div className="row overlayflowscroll">
                        <div className={`tab col-lg-2 col-12 ${showBlogs == true ? "active-tab" : "in-active"}`} onClick={() => setShowBlogs(true)}>
                            <div className="blog2_heading">
                                News
                            </div>
                        </div>
                        &nbsp;
                        <div className={`tab col-lg-2 col-12 ${showBlogs == false ? "active-tab" : "in-active"}`} onClick={() => setShowBlogs(false)}>
                            <div className="blog2_heading">
                                Video
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="blog2 new_blog2 blog_container ">
                <div className="container-fluid">
                    {
                        showBlogs ?
                            <div className="row news-1">
                                {
                                    blogsArr && blogsArr.length > 0 && blogsArr.map((el, index) => {
                                        return (
                                            <div key={index} className="col-xxl-3 col-xl-6 col-lg-6 col-lg-6 col-md-6 col-sm-6 d-flex justify-content-center align-items-center">
                                                <div className="blog_listing">
                                                    <div className="blog_listing_img">
                                                        <img src={generateImageUrl(el.image)} alt="" className="img-fluid blogImage" />
                                                    </div>
                                                    <div className="list_content_blog">
                                                        <h6>{el?.name}</h6>
                                                        {/* <h4> How to Secure Your Ecommerce Website from Cyberattacks</h4> */}
                                                        <div dangerouslySetInnerHTML={{ __html: el?.description.slice(0, 100) }}></div>
                                                        <Link to={`/blog-detail/${el._id}`} className="btn blog_readmore">Read More <BsArrowRight className="blog_arrow" /></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                            :
                            <div className="row video-2">
                                {
                                    blogVideoArr && blogVideoArr.length > 0 && blogVideoArr.map((el, index) => {
                                        return (
                                            <div key={index} className="col-xxl-4 col-xl-6 col-lg-6 col-lg-6 col-md-6 col-sm-6 d-flex justify-content-center align-items-center">
                                                <div className="blog_listing">
                                                    <div className="blog_listing_img">
                                                        {/* {el.url} */}
                                                        {
                                                            el.url && el.url.includes("http") &&
                                                            <iframe src={(el.url)} allowFullScreen frameborder="0" className="img-fluid blogImage"></iframe>
                                                        }
                                                        {/* <img src={generateImageUrl(el.image)} alt="" className="img-fluid blogImage" /> */}
                                                    </div>
                                                    {/* <div className="list_content_blog">
                                                        <h6>{el?.name}</h6>
                                                        <div dangerouslySetInnerHTML={{ __html: el?.description.slice(0, 100) }}></div>
                                                        <Link to={`/blog-detail/${el._id}`} className="btn blog_readmore">Read More <BsArrowRight className="blog_arrow" /></Link>
                                                    </div> */}
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>

                    }
                </div>
            </div>
        </Container>
      



      {/* <section className="ptb-80 contact-us">
        <div className="container">
          <div className="row gx-lg-5">
            <div className="col-12 col-md-6">
              <div className="left">
                <h1 className="heading">
                  Get free quotes from multiple sellers
                </h1>
                <ul className="list">
                  <li>
                    <div className="icon">
                      <RiMessage2Line />
                    </div>
                    <h6>
                      Tell us what <br className="d-none d-lg-block" /> You Need
                    </h6>
                  </li>
                  <li>
                    <div className="icon">
                      <GiReceiveMoney />
                    </div>
                    <h6>Receive free quotes from sellers</h6>
                  </li>
                  <li>
                    <div className="icon">
                      <FaHandshake />
                    </div>
                    <h6>Seal The Deal</h6>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="right">
                <h3 className="heading yellow">Tell us your Requirement</h3>
                <form className="form row">
                  <div className="col-12">
                    <label>Name *</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="col-12">
                    <label>Mobile No. *</label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      type="tel"
                      className="form-control"
                    />
                  </div>
                  <div className="col-12">
                    <label>Address *</label>
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="col-12">
                    <label>Product / Service *</label>
                    <input
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-custom btn-yellow mt-2"
                      type="button"
                      onClick={(e) => handleSubmitRequirement(e)}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section> */}

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
                      value={name}
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

      <Modal show={signInModal} centered onHide={() => setSignInModal(false)}>
        <Modal.Body className="sign-in-modal custom-modal">
          <div>
            <img src={successgif} alt="" className="main-logo img-fluid" />
          </div>

          <h1 className="heading">Thank You!</h1>
          <h6>Visiting Again</h6>
          <a className="btn btn-custom btn-yellow mt-2" href="/">
            Go to Home
          </a>
        </Modal.Body>
      </Modal>
    </main>
  );
}

export default Index;
