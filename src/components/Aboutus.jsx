import React from "react";
import "../assets/css/aboutus.css";
import { AiOutlineSafety, AiOutlineStar } from "react-icons/ai";
import { RiMessage2Line } from "react-icons/ri";
import aboutimg from "../../src/assets/images/about.jpg"
import teamimg from "../../src/assets/images/about_imga.jpg";
import teamimg1 from "../../src/assets/images/team1111.jpeg";
import teamimg2 from "../../src/assets/images/team211.jpg";
import teamimg3 from "../../src/assets/images/team3111.jpg";
import { BiStore } from "react-icons/bi";
import { MdOutlineVerified } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
import { Link } from "react-router-dom";
import AboutUS_image from "../assets/image/home/images/about_img.png";
import AboutUS_image2 from "../assets/image/home/images/image 110.png";
import { Col, Container, Row } from "react-bootstrap";
import About_Header_img from '../assets/image/home/images/Group 1000004425.png'
import mission_image from '../assets/image/home/images/arrow.png'
import man_img from '../assets/image/home/images/image 6.png'
import img1 from "../assets/image/home/images/imghome.png";
import img2 from "../assets/image/home/images/imgtrust.png";
import img3 from "../assets/image/home/images/imgpay.png";
import feature from "../assets/image/home/images/Group 1000004438.png";

const Aboutus = () => {
  return (
    <div>
      <main>
        {/* <section className="main-banner mb-80">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-6">
                <div className="content">
                  <h1 className="heading">About Us</h1>
                  <p className="desp">
                    Plywood bazar is India's largest online B2B marketplace,
                    connecting buyers with suppliers.
                  </p>
                  <ul className="list">
                    <li>
                      <div className="icon">
                        <AiOutlineStar />
                      </div>
                      <h6>Trusted Platform</h6>
                    </li>
                    <li>
                      <div className="icon">
                        <AiOutlineSafety />
                      </div>
                      <h6>Safe & Secure</h6>
                    </li>
                    <li>
                      <div className="icon">
                        <RiMessage2Line />
                      </div>
                      <h6>Quick Assistance</h6>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        {/* <div className="container">
            <div className="row">
                <div className="col-6">
                    <h2>About us</h2>
                </div>
                <div className="col-6">
                    <p>Plywoodbazar. com is India's largest online B2B market place brought a platform to interact with Manufacturers, Retailers, and Wholesalers of Furniture, Plywood, Hardware & Interior Exterior Industries.</p>
                </div>
            </div>
        </div> */}


        {/* Header section */}

        <Container >
          <Row className="AboutUS_Header1 d-flex flex-wrap  align-items-center justify-content-center ">
            <Col lg={3}  md={4}className="Header_img">
              <img className="img-fluid" src={About_Header_img} alt="" />
            </Col>
            <Col className="Header_text">
              <div>
                <h1 className="text-center">ABOUT US</h1>
                <p className="mx-3">
                  Plywoodbazar. com is India's largest online B2B market place brought
                  a platform to interact with Manufacturers, Distributors ,Dealers,
                  Wholesalers and Retailers of Furniture, Plywood, Hardware &
                  Interior- Exterior Industries.
                </p>
              </div>
            </Col>
          </Row>
        </Container>




        {/* mission section */}


        <Container fluid className="Company_mission_main d-flex flex-column flex-md-row align-items-center">
          <Col lg={7} className="Company_text fs-5 mb-4 mb-md-0">
            <h1 className="text-white py-3 fw-bold">Company Mission</h1>
            <p>
              Plywood Bazar.com is a startup that is working to improve this
              unorganized furniture, interior and exterior industry by coordinating
              between them. Providing large potential market exposure for
              business expansion.
            </p>
          </Col>
          <Col lg={5} md={2} className="Company_mission_img">
            <img className="arrow" src={mission_image} alt="Company Mission" />
          </Col>
        </Container>




        {/* main team section */}

        {/* <Container fluid className="p-5 d-flex flex-wrap flex-column align-items-center justify-content-center gap-5">
          <h1 className="fw-bold">OUR TEAM</h1>
          <Row className="Team_main gap-2">
            <Col className="Team_cards">
              <div className="SubTeam_cards">
                <img className="man_img" src={man_img} alt="" />
                <div className="Card_bottum">
                  <div className="Bottum_text">
                    <h3>Mrs. John</h3>
                    <h5>CEO Director</h5>
                    <p>
                      After working over the product for a few years and studying
                      applications in various sectors Positive Metering Pumps
                    </p>
                  </div>
                </div>
              </div>
            </Col>

            <Col className="Team_cards">
              <div className="SubTeam_cards">
                <img className="man_img" src={man_img} alt="" />
                <div className="Card_bottum">
                  <div className="Bottum_text">
                    <h3>Mrs. Rohan</h3>
                    <h5>Finance Director</h5>
                    <p>
                      After working over the product for a few years and studying
                      applications in various sectors Positive Metering Pumps
                    </p>
                  </div>
                </div>
              </div>
            </Col>

            <Col className="Team_cards">
              <div className="SubTeam_cards">
                <img className="man_img" src={man_img} alt="" />
                <div className="Card_bottum">
                  <div className="Bottum_text">
                    <h3>Mrs. John</h3>
                    <h5>CEO Director</h5>
                    <p>
                      After working over the product for a few years and studying
                      applications in various sectors Positive Metering Pumps
                    </p>
                  </div>
                </div>
              </div>
            </Col>

            <Col className="Team_cards">
              <div className="SubTeam_cards">
                <img className="man_img" src={man_img} alt="" />
                <div className="Card_bottum">
                  <div className="Bottum_text">
                    <h3>Mrs. Rohan</h3>
                    <h5>Finance Director</h5>
                    <p>
                      After working over the product for a few years and studying
                      applications in various sectors Positive Metering Pumps
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container> */}





        {/* onboard section */}



        <Container fluid className="onboard_container  d-flex flex-wrap flex-column align-items-center justify-content-center">
          <h1 className="fw-bold pt-5">Why you should onboard with us</h1>
          <Row className="onboard_row p-3 ">
            <Col lg={3} md={4} sm={6} className="py-3" >
            <div className="onboard_col ">
              <img src={img1} alt="" />
              <h3 className="py-3">Sell on Plywood Bazar for free</h3>
              <p>
                Reach a Massive Network of Buyers - Effortlessly Plywood Bazar is
                India's leading B2B marketplace, connecting you with a vast
                network of qualified buyers in the furniture, plywood, hardware,
                and interior & exterior industries. Selling on Plywood Bazar is
                completely free!
              </p>
              <button>Known more</button>
              </div>
            </Col>

            <Col lg={3} md={4} sm={6} className="py-3">
            <div  className="onboard_col ">
              <img src={img2} alt="" />
              <h3 className="py-3">Connect with verified sellers.</h3>
              <p>
                Reach a Massive Network of Buyers - Effortlessly Plywood Bazar is
                India's leading B2B marketplace, connecting you with a vast
                network of qualified buyers in the furniture, plywood, hardware,
                and interior & exterior industries. Selling on Plywood Bazar is
                completely free!
              </p>
              <button>Start selling</button>
              </div>
            </Col>

            <Col lg={3} md={4} sm={6} className="py-3">
            <div className="onboard_col">
              <img className="bg-light" src={img3} alt="" />
              <h3 className="py-3">Pay with plywood Bazar. <br />&nbsp;</h3>
              <p>
                Reach a Massive Network of Buyers - Effortlessly Plywood Bazar is
                India's leading B2B marketplace, connecting you with a vast
                network of qualified buyers in the furniture, plywood, hardware,
                and interior & exterior industries. Selling on Plywood Bazar is
                completely free!
              </p>
              <button>Get verified</button>
              </div>
            </Col>

          </Row>
        </Container>








        {/* Features section */}

        <Container  fluid className="pt-5 pb-5">
            <img className="img-fluid" src={feature} alt="" />
        </Container>


        {/* <Container fluid className="onboard-container1 my-5">
        <h1>Why you should onboard with us</h1>
        <Row className="main-div">
          <Col>
            <img src={img1} alt="" />
            <h3>Sell on Plywood Bazar for free</h3>
            <p>
              Reach a Massive Network of Buyers - Effortlessly Plywood Bazar is
              India's leading B2B marketplace, connecting you with a vast
              network of qualified buyers in the furniture, plywood, hardware,
              and interior & exterior industries. Selling on Plywood Bazar is
              completely free!
            </p>
            <button>Known more</button>
          </Col>
          <Col>
            <img src={img2} alt="" />
            <h3>Connect with verified sellers.</h3>
            <p>
              Reach a Massive Network of Buyers - Effortlessly Plywood Bazar is
              India's leading B2B marketplace, connecting you with a vast
              network of qualified buyers in the furniture, plywood, hardware,
              and interior & exterior industries. Selling on Plywood Bazar is
              completely free!
            </p>
            <button>Start selling</button>
          </Col>
          <Col>
            <img src={img3} alt="" />
            <h3>Pay with plywood Bazar.</h3>
            <p>
              Reach a Massive Network of Buyers - Effortlessly Plywood Bazar is
              India's leading B2B marketplace, connecting you with a vast
              network of qualified buyers in the furniture, plywood, hardware,
              and interior & exterior industries. Selling on Plywood Bazar is
              completely free!
            </p>
            <button>Get verified</button>
          </Col>
        </Row>
      </Container>
     */}





        {/* <Container   className="Team_main mt-5 ">
          <h1>OUR TEAM</h1>
          <Row className="Team_row ">
            <Col lg={3} className="Team_cards">
              <img className="man_img" src={man_img} alt="" />
              <div className="Card_bottum">
                <div className="Bottum_text">
                  <h3>Mrs.John</h3>
                  <h5>CEO Director</h5>
                  <p>
                    After working over the product for a few years and studying
                    applications in various sectors Positive Metering Pumps
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={3} className="Team_cards">
              <img className="man_img" src={man_img} alt="" />
              <div className="Card_bottum">
                <div className="Bottum_text">
                  <h3>Mrs.John</h3>
                  <h5>CEO Director</h5>
                  <p>
                    After working over the product for a few years and studying
                    applications in various sectors Positive Metering Pumps
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={3} className="Team_cards">
              <img className="man_img" src={man_img} alt="" />
              <div className="Card_bottum">
                <div className="Bottum_text">
                  <h3>Mrs.John</h3>
                  <h5>CEO Director</h5>
                  <p>
                    After working over the product for a few years and studying
                    applications in various sectors Positive Metering Pumps
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={3} className="Team_cards">
              <img className="man_img" src={man_img} alt="" />
              <div className="Card_bottum">
                <div className="Bottum_text">
                  <h3>Mrs.John</h3>
                  <h5>CEO Director</h5>
                  <p>
                    After working over the product for a few years and studying
                    applications in various sectors Positive Metering Pumps
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container> */}




        {/* choose us section */}
        {/* <section className="mb-80 mt-80">
          <div className="container">
            <div className="text-center mb-5 pb-5">
              <h1 className="heading bottom-line brown">
                Why you should onboard with us’
              </h1>
            </div>
            <div className="row">
              <div className="col-12 col-lg-4 mb-lg-0 mb-5">
                <div className="more-box">
                  <div className="icon">
                    <BiStore />
                  </div>
                  <div className="content">
                    <h4>Sell on Plywood Bazar for free</h4>
                    <p>
                      Reach a Massive Network of Buyers - Effortlessly
                      Plywood Bazar is India's leading B2B marketplace, connecting you with a vast network of qualified buyers in the furniture, plywood, hardware, and interior & exterior industries.  Selling on Plywood Bazar is completely free!

                    </p>
                    <Link to="/" className="btn btn-custom btn-brown">
                      Start Selling
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4 mt-lg-0 mt-5 mb-lg-0 mb-5">
                <div className="more-box">
                  <div className="icon">
                    <MdOutlineVerified />
                  </div>
                  <div className="content">
                    <h4>Connect with verified sellers.</h4>
                    <p>
                      Find the perfect partners for your furniture, plywood, hardware, and interior/exterior needs.
                      Plywood Bazar is India's largest B2B marketplace, connecting you with a vast network of verified manufacturers, distributors, dealers, wholesalers, and retailers.  No more sifting through unreliable sources.

                    </p>
                    <Link to="/" className="btn btn-custom btn-brown">
                      Get Verified Sellers
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4 mt-lg-0 mt-5">
                <div className="more-box">
                  <div className="icon">
                    <GiPayMoney />
                  </div>
                  <div className="content">
                    <h4>Pay with plywood Bazar.</h4>
                    <p>
                      Join our vibrant community today and experience the convenience of secure transactions, reliable logistics, and unparalleled customer service. Pay with Plywood Bazar and elevate your business to new heights!
                    </p>
                    <Link to="/" className="btn btn-custom btn-brown">
                      Know More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* <section className="mb-80 mt-80">
          <div className="text-center mb-5 pb-5">
            <h1 className="heading bottom-line brown">Our Team</h1>
          </div>
          <div className="container">
            <div className="row team_img">
            <div className="col-12 col-md-4 text-center">
                <img src={teamimg2} alt="" className="img-fluid" />
                  <h5>Sandeep Saini- GM</h5>
              </div>
              <div className="col-12 col-md-4 text-center">
                <img src={teamimg3} alt="" className="img-fluid" />
                <h5>Upashna Tripathi- HR </h5>
              </div>
           
              <div className="col-12 col-md-4 text-center">
                <img src={teamimg1} alt="" className="img-fluid" />
                <h5>Our Team </h5>
              </div>
              
            </div>
          </div>
        </section> */}
      </main>
    </div>
  );
};

export default Aboutus;
