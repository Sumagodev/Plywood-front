import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { ImLocation } from "react-icons/im";
import { Link } from "react-router-dom";
import { images } from "../Utility/Images";
import { addNewsLetter } from "../../services/newsLetter.service";
import { toastError, toastSuccess } from "../../utils/toastutill";
import { getNestedCategories } from "../../services/Category.service";
import { Container, Row, Col } from "react-bootstrap";
// import logo from "../../assets/image/home/image 109.png";
import logo from "../../assets/image/home/images/logo6.png";

import { SlLocationPin } from "react-icons/sl";
import { MdOutlineEmail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import "../../assets/css/Footer.css";
import whp from '../../assets/image/home/Layer 13 1.png'
import fb from '../../assets/image/home/Facebook Icon.png'
import inst from '../../assets/image/home/instagram 1.png'
import yout from '../../assets/image/home/11 1.png'
function Footer() {
  const [email, setEmail] = useState("");
  const [categoryArr, setcategoryArr] = useState([]);

  const handleNestedcategories = async () => {
    try {
      let { data: res } = await getNestedCategories();
      if (res.data) {
        setcategoryArr(res.data.map((el) => ({ ...el, checked: false })));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleNestedcategories();
  }, []);
  const HandleNewsLetterCreate = async () => {
    try {
      if (email == "") {
        toastError("Email is mandatory");
        return;
      }

      if (!email.includes("@")) {
        toastError("Invalid Email provided");
        return;
      }
      if (!email.includes(".")) {
        toastError("Invalid Email provided");
        return;
      }

      let obj = {
        email,
      };
      let { data: res } = await addNewsLetter(obj);
      if (res.message) {
        toastSuccess(res.message);
      }
    } catch (err) {
      toastError(err);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* <section className="py-4 news-letter">
        <div className="container">
          <div className="row align-items-end gx-lg-5 justify-content-center">
            <div className="col-12 col-md-4">
              <h1 className="heading mb-0 text-end brown">Newsletter</h1>
            </div>
            <div className="col-12 col-md-8">
              <form className="form row">
                <div className="col-12">
                  <div className="d-flex gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control bg-white"
                      placeholder="Subscribe to Our Weekly Newsletter"
                    />
                    <button
                      type="button"
                      onClick={() => HandleNewsLetterCreate()}
                      className="btn btn-custom btn-brown"
                    >
                      SUBSCRIBE
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="footer">
          <div className="container">
            <div className="row gx-lg-5">
              <div className="col-12 col-md-4">
                <div className="footer-inner">
                  <Link to="/" className="navbar-brand">
                    <img src={images.logo} className="main-logo mb-3" alt="" />
                  </Link>
                  <p className="text text-white fs-15">
                    Plywood bazar. com is India's largest online B2B market
                    place brought a platform to interact with Manufacturers,
                    Distributors, Dealers, Wholesalers and Retailers of
                    Furniture, Plywood, Hardware & Interior Exterior Industries.
                  </p>

                  <p className="mt-4 text-white text" style={{ fontSize: 20 }}>
                    Plywood Bazar.com brand owned by Dipparv Ventures LLP
                  </p>
                  <p className="text text-white" style={{ fontSize: 18 }}>
                    Email Id - dipparv.in@gmail.com
                  </p>
                  <p className="text text-white" style={{ fontSize: 18 }}>
                    Job/Career - admin@plywoodbazar.com
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-2">
                <div className="footer-inner">
                  <h4 className="title">Quick Links</h4>
                  <ul className="links">
                    <li>
                      <Link className="text-white" to="/Aboutus">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link className="text-white" to="/Shop">
                        View Products
                      </Link>
                    </li>
                    <li>
                      <Link className="text-white" to="/Privacy">
                        Privacy Policy
                      </Link>

                     </li>
                    <li>
                      <Link className="text-white" to="/Terms">
                        Terms & Condition
                      </Link>
                                             </li>
                    <li>
                      <Link className="text-white" to="/Refund">
                        Refund Policy
                      </Link>
                    </li>
                    <li>
                      <Link className="text-white" to="/Moto">
                        Company Moto
                      </Link>
                    </li>
                    <li>
                      <Link className="text-white" to="#">
                        Testimonials
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="footer-inner">
                  <h4 className="title">Catagories</h4>
                  <ul className="links">
                    {categoryArr &&
                      categoryArr.map((category) => (
                        <li onClick={scrollToTop}>
                          <Link
                            className="text-white"
                            to={`/Shop?categories=${category._id}`}
                          >
                            {category?.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="footer-inner">
                  <h4 className="title">Get In Touch</h4>
                  <ul className="links">
                    <li>
                      <div className="icon">
                        <FaPhoneAlt />
                      </div>
                      <a className="text-white" href="tel:+9403574184">
                        +91 9403574184
                      </a>
                    </li>
                    <li>
                      <div className="icon">
                        <GrMail />
                      </div>
                      <a
                        className="text-white"
                        href="mailto:info@plywoodbazar.com"
                      >
                        info@plywoodbazar.com
                      </a>
                    </li>
                    <li>
                      <div className="icon">
                        <ImLocation />
                      </div>
                      <a
                        className="text-white"
                        href="https://maps.app.goo.gl/CWiUj6ts9Dx5T5Pb6"
                        target="_blank"
                      >
                        E-Wing 407, Business Plus, next to Sai Square, Near
                        Mumbai Naka, Tidke Colony Nashik, Maharashtra 422002.
                      </a>
                    </li>
                  </ul>
                  <ul className="social-links">
                    <li>
                      <a
                        className="text-white icon"
                        href="https://www.facebook.com/profile.php?id=100063861976220&mibextid=LQQJ4d"
                        target="_blank"
                      >
                        <FaFacebookF />
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-white icon"
                        href="https://www.instagram.com/plywood_bazar/"
                        target="_blank"
                      >
                        <FaInstagram />
                      </a>
                    </li>
                  
                    <li>
                      <a
                        className="text-white icon"
                        href="https://www.linkedin.com/company/plywoodbazar/mycompany/"
                        target="_blank"
                      >
                        <FaLinkedinIn />
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-white icon"
                        href="https://www.youtube.com/@DipparvVentures"
                        target="_blank"
                      >
                        <FaYoutube />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright text-center">
          <div className="container">
            <p className="text-white">
              © 2022, Plywood Bazar. Design & Developed by
              <a href="ebslon.com"> Ebslon Infotech</a>
            </p>
          </div>
        </div>
      </footer> */}
      <>
        <div className="footer">
          <div
            style={{ backgroundColor: "#E2DCCF", height: "5px" }}
            className="mt-1"
          ></div>
          <Container className=" text-white mt-0 mt-lg-5 p-4 p-md-0">
            <Row className="elements1">
              <Col xs={12} lg={4} className="">
                <Link

                  to='/'>

                  <p>
                    <img src={logo} alt="" className="img-fluid" />
                  </p></Link>
                <p>
                  Plywood bazar. com is India's largest online B2B market place
                  brought a platform to interact with Manufacturers,
                  Distributors, Dealers, Wholesalers and Retailers of Furniture,
                  Plywood, Hardware & Interior Exterior Industries.
                </p>
                <p>
                  <b>Email Id</b> - dipparv.in@gmail.com <br />
                  Job/Career - admin@plywoodbazar.com
                </p>
              </Col>
              <Col lg={5}>
                <Row>
                  <Col className="quicklinks mt-5 mt-lg-0" xs={12} lg={4}>
                    <h5 className=" text-white">QUICK LINKS</h5>

                    <ul className="links">
                      <li>
                        <Link className="text-white" to="/Aboutus">
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link className="text-white" to="/product-details">
                          View Products
                        </Link>
                      </li>
                      <li>
                        <Link className="text-white" to="/Privacy">
                          Privacy Policy
                        </Link>

                        {/* <a target="_blank" href="https://plywoodbazar.com/Privacy Policy Plywood Bazar Updated.pdf">Privacy Policy</a> */}
                      </li>
                      <li>
                        <Link className="text-white" to="/Terms">
                          Terms & Condition
                        </Link>
                        {/* <a target="_blank" href="https://plywoodbazar.com/Terms & Conditions Updated.pdf"></a> */}
                      </li>
                      <li>
                        <Link className="text-white" to="/Refund">
                          Refund Policy
                        </Link>
                        {/* <a target="_blank" href="https://plywoodbazar.com/Refund Policy Plywood Bazar.pdf"></a> */}
                      </li>
                      <li>
                        <Link className="text-white" to="/Moto">
                          Company Moto
                        </Link>
                        {/* <a target="_blank" href="https://plywoodbazar.com/Moto - Vision.pdf"></a> */}
                      </li>
                      <li>
                        <Link className="text-white" to="#">
                          Testimonials
                        </Link>
                        {/* <a target="_blank" href="https://plywoodbazar.com/Moto - Vision.pdf"></a> */}
                      </li>
                    </ul>
                  </Col>
                  <Col className="product1 mt-5 mt-lg-0" xs={12} lg={8}>
                    <h5 className=" text-white">PRODUCT</h5>
                    <Row>
                      <Col lg={6}>
                        <ul>
                          {categoryArr &&
                            categoryArr
                              .slice(0, Math.ceil(categoryArr.length / 2))
                              .map((category) => (
                                <li key={category._id} onClick={scrollToTop}>
                                  <Link
                                    className="text-white"
                                    to={`/Shop?categories=${category._id}`}
                                  >
                                    {category?.name}
                                  </Link>
                                </li>
                              ))}
                        </ul>
                      </Col>
                      <Col lg={6}>
                        <ul>
                          {categoryArr &&
                            categoryArr
                              .slice(Math.ceil(categoryArr.length / 2))
                              .map((category) => (
                                <li key={category._id} onClick={scrollToTop}>
                                  <Link
                                    className="text-white"
                                    to={`/Shop?categories=${category._id}`}
                                  >
                                    {category?.name}
                                  </Link>
                                </li>
                              ))}
                        </ul>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col className="contactus mt-5 mt-lg-0" xs={12} lg={3}>
                <h5 className=" text-white">CONTACT US</h5>
                <ul className="list-unstyled">
                  <li>
                    <IoCallOutline />
                    &nbsp; +91 9403574184
                  </li>
                  <li>
                    <MdOutlineEmail />
                    &nbsp; info@plywoodbazar.com
                  </li>
                  <li>
                    <SlLocationPin />
                    &nbsp; E-Wing 407, Business Plus, <br /> next to Sai Square,
                    Near <br />
                    Mumbai Naka, Tidke Colony <br /> Nashik, Maharashtra 422002.
                  </li>
                </ul>
              </Col>
            </Row>
            <Row className="elements2">
              <Col className="subscribe-container">
                <div className="button-container">
                  <input
                    type="email"
                    placeholder="Subscribe to our News Letter"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button onClick={() => HandleNewsLetterCreate()}>
                    Subscribe
                  </button>
                </div>
              </Col>
              <Col className="copyright">
                <div>
                  © 2024 Copyright :{" "}
                  <a href="https://www.sumagoinfotech.com/">
                    Made with Passion by Sumago Infotech
                  </a>
                </div>
              </Col>
              <Col className="social-icons">
                {/* <div className="social_icons col-lg-6 px-5 text-end d-inline-flex align-items-center justify-content-end">
                  <div className="d-flex">
                    <a
                      className="icn p-2 btn-social rounded-circle mx-2"
                      href=""
                    >
                      <img src={fb} className=" img-fluid" />
                    </a>
                    <a
                      className="icn p-2 btn-social rounded-circle mx-2"
                      href=""
                    >
                      <img src={inst} className=" img-fluid" />
                    </a>
                    <a
                      className="icn p-2 btn-social rounded-circle mx-2"
                      href=""
                    >
                      <img src={yout} className=" img-fluid" />
                    </a>
                    <a
                      className="icn p-2 btn-social rounded-circle mx-2"
                      href=""
                    >
                      <img src={whp} className=" img-fluid" />
                    </a>
                  </div>
                
                </div> */}
                <ul className="list1 list-unstyled">
                  <li className="">
                    <a href="https://www.facebook.com/profile.php?id=100063861976220&mibextid=LQQJ4d" target="_blank"
                    >
                      <img src={fb} className="p-1 img-fluid" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/plywoodbazar.com_?igsh=MXJma2draXU1eXJ1MQ=="
                    >
                      <img src={inst} className="p-1 img-fluid" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/@DipparvVentures" target="_blank"
                    >
                      <img src={yout} className="p-1 img-fluid" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={whp} className="p-1 img-fluid" />
                    </a>
                  </li>
                </ul>
            
              </Col>
            </Row>
          </Container>
        </div>
      </>
    </>
  );
}

export default Footer;