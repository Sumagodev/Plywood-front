import React, { useEffect, useState } from 'react'
import newvedor from "../assets/image/home/Group 1000004112.png";
import PageBanner from './Utility/PageBanner';
import G1 from "../assets/images/G1.png"
import G2 from "../assets/images/G2.png"
import G3 from "../assets/images/G3.png"
import G4 from "../assets/images/G4.png"
import ShopFilter from "../components/ShopFilter"
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { generateImageUrl } from "../services/url.service";
import { getNestedCategories } from '../services/Category.service';
import greenimg from "../assets/image/home/images/greenlam1.png";
import { LuPhoneCall } from "react-icons/lu";
import { IoLocationSharp } from "react-icons/io5";
import { errorToast } from "./Utility/Toast";
import { useSelector } from 'react-redux';
import { toastSuccess } from "../utils/toastutill";
import { addUserRequirement } from "../services/UserRequirements.service";
import { FaPhoneVolume } from "react-icons/fa6";
import icon1 from "../assets/image/home/images/1.png";
import bannerImg from "../assets/images/bannerImg.png"
import "../assets/css/home.css";
import "../assets/css/vendor.css";
import { images } from "./Utility/Images";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import img1 from "../assets/image/home/imgdelhi.png";
import img2 from "../assets/image/home/imgmumbai.png";
import img3 from "../assets/image/home/imgkolkata.png";
import img7 from "../assets/image/home/imghyderabad.png";
import img5 from "../assets/image/home/imggujarat.png";
import cardImg from "../assets/images/cardImg.png"
import {
    deleteProductbyId,
    getProducts,
} from "../services/Product.service";

import { toastError } from "../utils/toastutill";
import { getBrands } from '../services/brand.service';

const cardData = [
    {
        imgSrc: G1
    },
    {
        imgSrc: G2
    },
    {
        imgSrc: G3
    },
    {
        imgSrc: G1
    },
    {
        imgSrc: G4
    },
]
const ProductDetails = () => {

    const auth = useSelector((state) => state.auth.user);
    const [signInModal, setSignInModal] = useState(false);
    const [categoryArr, setcategoryArr] = useState([]);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [productName, setProductName] = useState("");


    const [brandArr, setBrandArr] = useState([]);

    const getBrand = async () => {
        try {
            const { data: res } = await getBrands();
            console.log("brands....", res.data);

            if (res) {
                setBrandArr(res.data);
            }
        } catch (error) {
            toastError(error);
        }
    };

    useEffect(() => {
        getBrand();
    }, []);
    const states = {
        0: {
            slidesPerView: 2,
        },
        576: {
            slidesPerView: 3,
        },
        992: {
            slidesPerView: 5,
        },
        1200: {
            slidesPerView: 5,
        },
        1400: {
            slidesPerView: 5,
        },
    };

    const cities = [
        { imgSrc: img1, name: "Delhi" },
        { imgSrc: img2, name: "Mumbai" },
        { imgSrc: img3, name: "Kolkata" },
        { imgSrc: img7, name: "Hyderabad" },
        { imgSrc: img5, name: "Gujarat" },
    ];

    const handleApplyFilter = () => {

    }
    const handleClearFilter = () => {

    }

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

    const [productArr, setProductArr] = useState([]);

    const handleGetProducts = async () => {
        try {


            let { data: res } = await getProducts();
            if (res.data) {
                console.log("res.data......qqqqqq", res.data);

                setProductArr(res.data);
            }
        } catch (err) {
            errorToast(err);
        }
    };
    useEffect(() => {
        handleGetProducts();
    }, []);
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

    return (
        <main>
            <section className="shop-page shoppagepading ">
                <div className="container-fluid">
                    <PageBanner img={images.top_banner} title="We connect Buyers & Sellers" desp="Plywood bazar is India's largest online B2B marketplace, connecting buyers with suppliers." className="mx-0" />
                    <div className="row mt-lg-4 px-4pc" >
                        <div className="col-12 mt-5 d-none d-lg-block">
                            <ShopFilter
                                handleApplyFilter={handleApplyFilter}
                                handleClearFilter={handleClearFilter}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <Row>
                <div className=" col-12 col-lg-2 ">
                    <div>
                        <section className="py-4 text-center">
                            <Container fluid className="">
                                <h6 className=' fs-2'>RECOMMENDED PRODUCT</h6>
                                <Row className='d-lg-block d-none'>
                                    <div className=' col-lg-12 '>
                                        {categoryArr &&
                                            categoryArr
                                                .slice(0, 4)
                                                .map((item, index) => (

                                                    <Link to={`/Shop?categories=${item._id}`}>
                                                        <Col className="d-grid text-center align-items-center justify-content-center ">
                                                            <div className="pt-2  d-grid align-items-center justify-content-center">
                                                                <img
                                                                    src={generateImageUrl(item.image)}
                                                                    className=" img-fluid recommondedprdcrd rounded-5 "
                                                                    alt={item.name}
                                                                />
                                                                <p className="fw-bolder mx-4 py-3 recommondedprdname fs-6">{item.name}</p>

                                                            </div>
                                                        </Col>
                                                    </Link>
                                                ))}
                                    </div>
                                </Row>
                                <Row className='d-block d-lg-none  '>
                                    {
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
                                            {categoryArr &&
                                                categoryArr
                                                    .slice(0, 8)
                                                    .map((item, index) => (
                                                        <SwiperSlide key={index}>
                                                            <Link to={`/Shop?categories=${item._id}`}>
                                                                <Col className="d-grid text-center align-items-center justify-content-center">
                                                                    <div className="pt-2  d-grid align-items-center justify-content-center">
                                                                        <img
                                                                            src={generateImageUrl(item.image)}
                                                                            className=" img-fluid recommondedprdcrd rounded-5 "
                                                                            alt={item.name}
                                                                        />
                                                                        <p className="p-2 recommondedprdname">{item.name.slice(0, 20)}</p>

                                                                    </div>
                                                                </Col>
                                                            </Link>
                                                        </SwiperSlide>
                                                    ))}


                                        </Swiper>
                                    }
                                </Row>
                            </Container>
                        </section>
                    </div>
                </div>

                <div className=" col-12 col-lg-8 ">
                    <section>
                        <Container className="product-container-section">
                            <Row>
                                {productArr &&
                                    productArr.slice(0, 9).map((product, index) => (

                                        <Col className="d-flex justify-content-center align-items-center py-4" xxl={4} xl={6} lg={6} md={6} sm={6} xs={6}>
                                            <div className="box_Product1">
                                                <img src={generateImageUrl(product.mainImage)} alt={product.name} className="img-fluid ims img1" />
                                                <span className="icn_Product">
                                                    <a href={`tel: ${product.phone}`}>
                                                        <LuPhoneCall />
                                                    </a>
                                                </span>
                                                <div className="product_icn_text">
                                                    <Link to={`/ShopDetail/${product?.slug}`}>
                                                        <span className="green-1">{product?.name}</span>
                                                        <span className="chennai">
                                                            <IoLocationSharp /> {product?.cityName}
                                                        </span>
                                                        <span className="Rs-1">{product?.productPrice}</span>
                                                    </Link>
                                                </div>
                                                <button>1 Get Deal</button>
                                            </div>
                                        </Col>

                                    ))}

                            </Row>
                            <div className="d-flex justify-content-center align-items-center mt-3">
                                <button className="border-0 rounded-5 px-4 py-3 vvall text-white fw-bold fs-5" style={{ backgroundColor: "rgba(96, 50, 0, 1)" }}>
                                    View All
                                </button>
                            </div>
                        </Container>
                    </section>
                </div>

                <div className=" col-12 col-lg-2 ">
                    <div className="main-container-form py-2 my-5">
                        <p>TELL US YOUR REQUIREMENT</p>
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
                                    placeholder="Mobile No.*"
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

                    <section>
                        <Container className="main_Profiles my-5">
                            <h1 className="text-center mb-4">Top profiles</h1>
                            <Row className=''>
                                <Col xs={6} lg={12}
                                    className="d-flex justify-content-center align-items-center py-4"

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
                                <Col xs={6} lg={12}
                                    className="d-flex justify-content-center align-items-center py-4"

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
                </div>
            </Row>
            <Row>
                <img src={bannerImg} alt="bannerImg" className='ms-md-3' />
            </Row>

            <section>
                <Container>
                    <Row>
                        <Col lg={7} md={12} sm={12} style={{}}>
                            <Card className='p-4 shadow-lg border-0 my-5' style={{ borderRadius: "32px", background: "#FFF2E2" }}>
                                <h4 className='fw-bold'>TELL US WHAT YOU NEED FORM</h4>
                                <Form>
                                    <Row>
                                        <Col lg={6} md={12} sm={12}>
                                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                                <Form.Control type="text" style={{
                                                    borderRadius: "32px",
                                                    backgroundColor: "transparent", // Makes the input field transparent
                                                    fontWeight: "bold", // Makes the placeholder text bold
                                                }} placeholder="Organization Name*" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6} md={12} sm={12}>
                                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                                <Form.Control type="email" style={{
                                                    borderRadius: "32px",
                                                    backgroundColor: "transparent", // Makes the input field transparent
                                                    fontWeight: "bold", // Makes the placeholder text bold
                                                }} placeholder="Address*" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6} md={12} sm={12}>
                                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                                {/* <Form.Label>Email address</Form.Label> */}
                                                <Form.Control type="email" style={{
                                                    borderRadius: "32px",
                                                    backgroundColor: "transparent", // Makes the input field transparent
                                                    fontWeight: "bold", // Makes the placeholder text bold
                                                }} placeholder="Mobile No.*" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6} md={12} sm={12}>
                                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                                {/* <Form.Label>Email address</Form.Label> */}
                                                <Form.Control type="email" style={{
                                                    borderRadius: "32px",
                                                    backgroundColor: "transparent", // Makes the input field transparent
                                                    fontWeight: "bold", // Makes the placeholder text bold
                                                }} placeholder="Product / Service*" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6} md={12} sm={12}>
                                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                                <Button className='w-100 border-0' style={{ borderRadius: "32px", background: "#603200" }}>Submit</Button>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>
                        </Col>
                        <Col lg={5} md={12} sm={12} className='mt-lg-3'>
                            <img src={cardImg} className='w-100 mt-lg-4' alt="card img" />
                        </Col>
                    </Row>
                </Container>
            </section>

            <Container>
                <h2 className='mx-4 fw-bold'>
                    Related Brand
                </h2>
            </Container>
            <section className='smallBanner d-flex flex-column justify-content-around'>
                <Container fluid className=" px-lg-5 py-lg-4 py-2 fw-bold">

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
                        {brandArr.map((brand, index) => (
                            <SwiperSlide key={index}>
                                <div>
                                    <img
                                        src={generateImageUrl(brand.image)}
                                        className="w-75"
                                        alt={brand.name}
                                    />
                                    {/* <p className="text-center">{brand.name}</p> */}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Container>
            </section>
        </main>
    )
}

export default ProductDetails