import React, { useEffect, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { MdCall } from "react-icons/md";
import { Link, useLocation, useSearchParams, useNavigate, redirect } from "react-router-dom";
import { getNameBySlug } from "../services/Category.service";
import { getAllProducts, getrecommondedProducts } from "../services/Product.service";
import { addUserRequirement } from "../services/UserRequirements.service";
import { getNestedCategories } from "../services/Category.service";
import { generateImageUrl } from "../services/url.service";
import { toastError } from "../utils/toastutill";
import ShopFilter from "./ShopFilter";
import mancrp from "../assets/image/home/images/mancrp.png";
import { successToast } from "./Utility/Toast";
import { useDispatch } from "react-redux";
import { images } from "./Utility/Images";
import PageBanner from "./Utility/PageBanner";
import { useSelector } from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";
import { getAllUsers } from "../services/User.service";
import { BsStarFill } from "react-icons/bs";
import { getWebsiteData } from "../services/websiteData.service";
import ReactPaginate from "react-paginate";
import { FaPhoneVolume } from "react-icons/fa6";
import icon1 from "../assets/image/home/images/1.png";
import { Col, Row, Container, Table, Modal } from "react-bootstrap";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { errorToast } from "./Utility/Toast";
import { toastSuccess } from "../utils/toastutill";
import newvedor from "../assets/image/home/Group 1000004112.png";
import { IoMdMailOpen } from "react-icons/io";
import { BiSolidMessage } from "react-icons/bi";
import { MdThumbUp } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import "../assets/css/home.css";
import "../assets/css/vendor.css";
import {
  sentOtp,
} from "../services/User.service";
import { checkForValidSubscriptionAndReturnBoolean } from "../services/User.service";
import { login } from "../redux/features/auth/authSlice";

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.user);
  const [signInModal, setSignInModal] = useState(false);
  const [categoryArr, setcategoryArr] = useState([]);
  const [currentUserHasActiveSubscription, setCurrentUserHasActiveSubscription] = useState(false);
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);
  let role = useSelector((state) => state.auth.role);
  const [shopImage, setShopImage] = useState("");
  const [productsArr, setProductsArr] = useState([]);
  const [limit, setLimit] = useState(18);
  const [page, setPage] = useState(1);
  const [totalPages, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [productName, setProductName] = useState("");
  const [otpsent, setotpsent] = useState(false);
  const [mobile, setmobile] = useState("");
  const [otp, setotp] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [loginByEmail, setLoginByEmail] = useState(false);

  let cancelToken;
  let userObj = useSelector((state) => state.auth.user);

  const handleGetProducts = async (cancelTokenValue) => {
    try {
      let query = `role=${role}&perPage=${limit}`;

      if (searchParams && searchParams.toString()) {
        if (!searchParams.toString().includes("page")) {
          query += `&page=${page}`;
        }
        query += `&${searchParams.toString()}`;
      } else {
        query += `&page=${page}`;
      }
      let { data: res } = await getAllUsers(query, cancelTokenValue);
      if (res.data && res?.data?.length > 0) {
        Promise.resolve()
          .then(() => {

            setProductsArr(res?.data);
            setTotal(res?.total);
          })
          .then(() => {
            setIsLoading(false);
          });
      } else {
        Promise.resolve()
          .then(() => {
            setProductsArr([]);
            setTotal(0);
          })
          .then(() => {
            setIsLoading(false);
          });
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log(error, "errorerrorerror");
      } else {
        setIsLoading(false);
        toastError(error);
      }
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
  useEffect(() => {
    handleNestedcategories();
  }, []);
  const handleGetWebsiteData = async () => {
    try {
      let { data: res } = await getWebsiteData("");
      if (res.data) {
        setShopImage(res.data.shopImage);
      }
    } catch (err) {
      toastError(err);
    }
  };
  const [recommonded, setrecommonded] = useState([])
  const getrecommondedproducts = async () => {
    try {
      let { data: res } = await getrecommondedProducts("");
      if (res.data) {
        setrecommonded(res.data);
      }
    } catch (err) {
      toastError(err);
    }
  };


  const handlePageClick = (event) => {
    setSearchParams((searchParams) => {
      searchParams.set("page", event.selected + 1);
      return searchParams;
    });
    setPage(event.selected + 1);
  };
  const getProducts = async () => {
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel("Cacencel ....");
    }
    // customsearchParams.set("page",`${page}`);

    cancelToken = axios?.CancelToken.source();
    setIsLoading(true);
    // window.scrollTo(0, 0);
    handleGetProducts(cancelToken);
    // }
    return () => cancelToken.cancel("component unmounted");
  };

  useEffect(() => {
    if (searchParams.get("page")) {
      setPage(searchParams.get("page"));
      return;
    }
    handleGetWebsiteData();
  }, []);

  useEffect(() => {
    getProducts();
  }, [page]);

  const handleApplyFilter = () => {
    setSearchParams((searchParams) => {
      searchParams.set("page", 1);
      setPage(1);
      return searchParams;
    });
    getProducts();
  };
  const handleClearFilter = () => {
    getProducts();
  };

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShow2 = () => setShow2(true);
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
  useEffect(() => {
    if (auth && auth._id) {
      HandleCheckValidSubscription();
    }
  }, [auth]);
  const HandleCheckValidSubscription = async () => {
    try {
      let { data: res } = await checkForValidSubscriptionAndReturnBoolean(auth?._id)
      if (res.data) {
        setCurrentUserHasActiveSubscription(res.data)
      }
    }
    catch (err) {
      navigate('/Subscription')
    }
  }
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

  const handleRegister = () => {
    setSignInModal(false);
    return redirect("/Register");
  };
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
  return (
    <Container fluid>
      <main>
        <section className="shop-page shoppagepading ">
          <div className="container-fluid px-0">
            <div className="row px-0 mb-80 " >
              <PageBanner
                img={
                  shopImage && shopImage !== ""
                    ? generateImageUrl(shopImage)
                    : images.top_banner
                }
                className="mx-0 mb-80"
              />

              <div className="col-12  d-none d-lg-block">
                <ShopFilter
                  handleApplyFilter={handleApplyFilter}
                  handleClearFilter={handleClearFilter}
                />
              </div>
              <div className=" row px-0">
                <div className="col-12 col-lg-10">


                  <div className="row px-0 gy-5 main_Profiles">
                    {isLoading == true ? (

                      <div className="col-xl-12">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          style={{
                            margin: "auto",
                            background: "rgba(241, 242, 243,0)",
                            display: "block",
                          }}
                          width="100px"
                          height="100px"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="xMidYMid"
                        >
                          <g transform="translate(80,50)">
                            <g transform="rotate(0)">
                              <circle
                                cx="0"
                                cy="0"
                                r="6"
                                fill="C21807"
                                fill-opacity="1"
                              >
                                <animateTransform
                                  attributeName="transform"
                                  type="scale"
                                  begin="-0.875s"
                                  values="1.5 1.5;1 1"
                                  keyTimes="0;1"
                                  dur="1s"
                                  repeatCount="indefinite"
                                ></animateTransform>
                                <animate
                                  attributeName="fill-opacity"
                                  keyTimes="0;1"
                                  dur="1s"
                                  repeatCount="indefinite"
                                  values="1;0"
                                  begin="-0.875s"
                                ></animate>
                              </circle>
                            </g>
                          </g>
                          <g transform="translate(71.21320343559643,71.21320343559643)">
                            <g transform="rotate(45)">
                              <circle
                                cx="0"
                                cy="0"
                                r="6"
                                fill="C21807"
                                fill-opacity="0.875"
                              >
                                <animateTransform
                                  attributeName="transform"
                                  type="scale"
                                  begin="-0.75s"
                                  values="1.5 1.5;1 1"
                                  keyTimes="0;1"
                                  dur="1s"
                                  repeatCount="indefinite"
                                ></animateTransform>
                                <animate
                                  attributeName="fill-opacity"
                                  keyTimes="0;1"
                                  dur="1s"
                                  repeatCount="indefinite"
                                  values="1;0"
                                  begin="-0.75s"
                                ></animate>
                              </circle>
                            </g>
                          </g>
                          <g transform="translate(50,80)">
                            <g transform="rotate(90)">
                              <circle
                                cx="0"
                                cy="0"
                                r="6"
                                fill="C21807"
                                fill-opacity="0.75"
                              >
                                <animateTransform
                                  attributeName="transform"
                                  type="scale"
                                  begin="-0.625s"
                                  values="1.5 1.5;1 1"
                                  keyTimes="0;1"
                                  dur="1s"
                                  repeatCount="indefinite"
                                ></animateTransform>
                                <animate
                                  attributeName="fill-opacity"
                                  keyTimes="0;1"
                                  dur="1s"
                                  repeatCount="indefinite"
                                  values="1;0"
                                  begin="-0.625s"
                                ></animate>
                              </circle>
                            </g>
                          </g>
                          <g transform="translate(28.786796564403577,71.21320343559643)">
                            <g transform="rotate(135)">
                              <circle
                                cx="0"
                                cy="0"
                                r="6"
                                fill="C21807"
                                fill-opacity="0.625"
                              >
                                <animateTransform
                                  attributeName="transform"
                                  type="scale"
                                  begin="-0.5s"
                                  values="1.5 1.5;1 1"
                                  keyTimes="0;1"
                                  dur="1s"
                                  repeatCount="indefinite"
                                ></animateTransform>
                                <animate
                                  attributeName="fill-opacity"
                                  keyTimes="0;1"
                                  dur="1s"
                                  repeatCount="indefinite"
                                  values="1;0"
                                  begin="-0.5s"
                                ></animate>
                              </circle>
                            </g>
                          </g>
                          <g transform="translate(20,50.00000000000001)">
                            <g transform="rotate(180)">
                              <circle
                                cx="0"
                                cy="0"
                                r="6"
                                fill="C21807"
                                fill-opacity="0.5"
                              >
                                <animateTransform
                                  attributeName="transform"
                                  type="scale"
                                  begin="-0.375s"
                                  values="1.5 1.5;1 1"
                                  keyTimes="0;1"
                                  dur="1s"
                                  repeatCount="indefinite"
                                ></animateTransform>
                                <animate
                                  attributeName="fill-opacity"
                                  keyTimes="0;1"
                                  dur="1s"
                                  repeatCount="indefinite"
                                  values="1;0"
                                  begin="-0.375s"
                                ></animate>
                              </circle>
                            </g>
                          </g>
                          <g transform="translate(28.78679656440357,28.786796564403577)">
                            <g transform="rotate(225)">
                              <circle
                                cx="0"
                                cy="0"
                                r="6"
                                fill="C21807"
                                fill-opacity="0.375"
                              >
                                <animateTransform
                                  attributeName="transform"
                                  type="scale"
                                  begin="-0.25s"
                                  values="1.5 1.5;1 1"
                                  keyTimes="0;1"
                                  dur="1s"
                                  repeatCount="indefinite"
                                ></animateTransform>
                                <animate
                                  attributeName="fill-opacity"
                                  keyTimes="0;1"
                                  dur="1s"
                                  repeatCount="indefinite"
                                  values="1;0"
                                  begin="-0.25s"
                                ></animate>
                              </circle>
                            </g>
                          </g>
                          <g transform="translate(49.99999999999999,20)">
                            <g transform="rotate(270)">
                              <circle
                                cx="0"
                                cy="0"
                                r="6"
                                fill="C21807"
                                fill-opacity="0.25"
                              >
                                <animateTransform
                                  attributeName="transform"
                                  type="scale"
                                  begin="-0.125s"
                                  values="1.5 1.5;1 1"
                                  keyTimes="0;1"
                                  dur="1s"
                                  repeatCount="indefinite"
                                ></animateTransform>
                                <animate
                                  attributeName="fill-opacity"
                                  keyTimes="0;1"
                                  dur="1s"
                                  repeatCount="indefinite"
                                  values="1;0"
                                  begin="-0.125s"
                                ></animate>
                              </circle>
                            </g>
                          </g>
                          <g transform="translate(71.21320343559643,28.78679656440357)">
                            <g transform="rotate(315)">
                              <circle
                                cx="0"
                                cy="0"
                                r="6"
                                fill="C21807"
                                fill-opacity="0.125"
                              >
                                <animateTransform
                                  attributeName="transform"
                                  type="scale"
                                  begin="0s"
                                  values="1.5 1.5;1 1"
                                  keyTimes="0;1"
                                  dur="1s"
                                  repeatCount="indefinite"
                                ></animateTransform>
                                <animate
                                  attributeName="fill-opacity"
                                  keyTimes="0;1"
                                  dur="1s"
                                  repeatCount="indefinite"
                                  values="1;0"
                                  begin="0s"
                                ></animate>
                              </circle>
                            </g>
                          </g>
                        </svg>
                      </div>


                    ) : (
                      <>
                        <Row className="px-0">
                          {productsArr && productsArr.length > 0 ? (
                            productsArr.map((el, index) => {
                              return (
                                <>
                                  <Col xs={6} md={4} lg={4} xxl={3} xl={4}>
                                    <div className=" py-3 px-0 px-lg-2">
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
                                          <span className="p3">Rating - {el?.rating ? el?.rating : 0}</span>

                                          <span className="phone-icon"
                                            onClick={() => {
                                              if (!isAuthorized) {
                                                // If the user is not authorized, show the sign-in modal
                                                setSignInModal(true);
                                              } else if (!currentUserHasActiveSubscription) {
                                                // If the user has an active subscription, close the modal
                                                handleShow2(true)
                                              } else {
                                                // If the user does not have an active subscription, show the price modal
                                                window.location.href = `tel:${el.phone}`;

                                              }
                                            }}

                                          >    <FaPhoneVolume /></span>
                                        </div>


                                      </div>
                                      {/* </Link> */}
                                    </div>

                                  </Col>
                                </>
                              );
                            })
                          ) : (
                            <h4 style={{ color: "grey" }} className=" text-center mt-5">
                              No Vendors found
                            </h4>
                          )}

                        </Row>
                        <Col className=" text-center" id="react-paginate">
                          <ReactPaginate

                            previousLabel={"<"}
                            nextLabel={">"}
                            breakLabel={<a href="">...</a>}
                            breakClassName={"break-me"}
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={totalPages}
                            containerClassName={"pagination"}
                            activeClassName={"active"}
                            forcePage={page !== 0 ? page - 1 : 0}
                          />{" "}

                        </Col>
                      </>
                    )}

                  </div>
                </div>
                <div className=" col-12 col-lg-2 ">

                  <div className="main-container-form py-2 my-5">
                    <p className=" text-center">TELL US YOUR REQUIREMENT</p>
                    <Form action="/submit" className="form">
                      <Form.Group controlId="formName">
                        <Form.Control
                          type="text"
                          placeholder="Name*"
                          required
                          className="input"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId="formEmail">
                        <Form.Control
                          type="text"
                          placeholder="Mobile No.*"
                          required
                          className="input"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId="formEmail">
                        <Form.Control
                          type="text"
                          placeholder="Address*"
                          required
                          className="input"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId="formMessage">
                        <Form.Control
                          type="text"
                          placeholder="Product / Service*"
                          required
                          className="input"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                        />
                      </Form.Group>
                      <Button variant="primary" type="submit" className="button"
                        onClick={(e) => handleSubmitRequirement(e)}

                      >
                        Submit
                      </Button>
                    </Form>
                  </div>
                  <div>

                    <section className="py-4 text-center">
                      <Container fluid className="">
                        <h5>RECOMMENDED PRODUCT</h5>
                        <Row className="d-flex">

                          {categoryArr &&
                            categoryArr
                              .slice(0, 4)
                              .map((item, index) => (
                                <Col xs={5} lg={11} className="d-grid mx-3 text-center align-items-center justify-content-center">
                                  <Link to={`Shop?categories=${item._id}`}>

                                    <div className="pt-2  d-grid align-items-center justify-content-center">
                                      <img
                                        src={generateImageUrl(item.image)}
                                        className=" img-fluid  rounded-5 "
                                        alt={item.name}
                                      />
                                      <div className="recommondedprdname">
                                        <div className="fw-bol px-2 py-2  d-lg-block d-none">{item.name}</div>
                                        <div className=" d-flex justify-content-center  align-items-center d-block d-lg-none"> <span className="px-2  ">{item.name}</span></div>

                                      </div>

                                    </div>

                                  </Link>
                                </Col>
                              ))}

                        </Row>
                      </Container>
                    </section>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
        <Container fluid className="custom-container">
          <Row className="custom-container-row">
            <Col className="main_col_1">
              <div className="main_conatiner">
                <h1 className="fw-bold">
                  Get Free Quotes From Multiple Sellers {" "}
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

        <Modal show={show2} centered onHide={() => setShow2(false)} className="  rounded-5">


          <Modal.Body className="sign-in-modal custom-modal subscription-card-container">
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              onClick={() => setShow2(false)}
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
        <div className="filtershowbtn  d-lg-none" onClick={handleShow}>
          Show filter
        </div>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filter</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ShopFilter
              handleClose={handleClose}
              handleApplyFilter={handleApplyFilter}
              handleClearFilter={handleClearFilter}
            />

            <p className=" btnmodalfiexed" onClick={() => setShow(false)}>
              Select filter
            </p>
          </Offcanvas.Body>
        </Offcanvas>
      </main>
    </Container>
  );
}

export default Shop;
