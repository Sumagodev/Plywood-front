import React from "react";
import founder from "../assets/images/founder.jpeg";
import founder1 from "../assets/images/founder1.jpeg";
import { Container, Row, Col } from "react-bootstrap";
export default function Moto() {
  return (

    <div className="">

      <Container>
        <Row className="d-flex align-items-center justify-content-center py-4">
          <Col lg={3} className=" d-flex align-items-center justify-content-center">
            <div
              style={{
                width: 300,
                // height: 300,
                // border: "solid #FFE2B1 10px",
                // borderRadius: "50%",
                borderRadius: "5%",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "11px 11px 11px 0px #00000059"
                // box-shadow: 50px 45px 80px 0px #00000059;

              }}
            >
              <img
                src={founder}
                alt="founder"
                className="img-fluid"
                style={{
                  // width: "100%",
                  // height: "100%",
                  // objectFit: "cover",
                  // border: "solid #FFF8F3 15px",
                  // borderRadius: "50%",
                }}
              />
            </div>
          </Col>
          <Col lg={3} className=" p-3 d-flex flex-column  justify-content-center text-center ">
            <h3 className="fw-semibold">Sandip Chothave</h3>
            <h4>Founder & CEO <br />Plywood Bazar.Com</h4>
          </Col>

          <Col lg={3} className=" d-flex align-items-center justify-content-center">
            <div
              style={{
                width: 300,
                // height: 300,
                // border: "solid #FFE2B1 10px",
                // borderRadius: "50%",
                borderRadius: "5%",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "11px 11px 11px 0px #00000059"
                // box-shadow: 50px 45px 80px 0px #00000059;

              }}
            >
              <img
                src={founder1}
                alt="founder1"
                className="img-fluid"
                style={{
                  // width: "100%",
                  // height: "100%",
                  // objectFit: "inherit",
                  // border: "solid #FFF8F3 15px",
                  // borderRadius: "50%",
                }}
              />
            </div>
          </Col>
          <Col lg={3} className=" p-3 d-flex flex-column  justify-content-center text-center ">
            <h3 className="fw-semibold">Purva Chothave</h3>
            <h4>COO <br />Plywood Bazar.Com</h4>
          </Col>
        </Row>



      </Container>

      <Container fluid className="d-flex flex-column  justify-content-center">
        <Row className="moto-bg d-flex align-items-center justify-content-center" >
        <Col lg={8} className="p-4">
          <h1 className="text-center text-black fw-semibold py-3" style={{ color: "#603200" }}>Our Company Vision</h1>
          <ul >
            <li>
              Plywood Bazar.com is a startup that is working to improve this
              unorganized furniture , interior and exterior industry by co-ordinate
              in between them. Providing large potential market exposure for
              business expansion.
            </li>
            <li>
              In this final chapter of our B2B website saga, we celebrate the power
              of collaboration and the pursuit of excellence. We believe that true
              success is not achieved in isolation but through the collective
              efforts of a united ecosystem.
            </li>
            <li>
              In this chapter, we invite our partners to join us in a journey
              towards achieving excellence. Together, we set high standards,
              challenge mediocrity, andstrive for continuous improvement. We foster
              a culture of excellence that permeates every aspect of our businesses,
              from product development and service delivery to customer satisfaction
              and beyond.
            </li>
            <li>
              In this chapter, we also emphasize the importance of collaboration
              <strong> and synergy. </strong> We believe that the collective intelligence and diverse
              perspectives of our partners are the key drivers of innovation and
              success. By fostering a collaborative environment, we encourage the
              exchange of ideas, cross pollination of expertise, and the co-
              creation of solutions that surpass individual capabilities.
            </li>
            <li>
              As we strive for excellence, we also recognize the significance of
              recognizing and celebrating achievements. We acknowledge the hard
              work, dedication, and milestones reached by our partners, and we take
              pride in their accomplishments. Through recognition programs, awards,
              and shared success stories, we inspire and motivate each other to
              reach new heights.
            </li>
            <li>
              in this final chapter of our saga, we invite you to join us in the
              pursuit <strong> of excellence.</strong> Together, let's push the boundaries, exceed
              expectations, andcreate a legacy of remarkable achievements. Through
              our collective commitment to excellence and our unwavering support for
              one another, we will forge a future where success knows no bounds.
            </li>
          </ul>
        </Col>
        </Row>
      </Container>





      {/* <div className="row">
          <div className="col-12 d-flex flexunset">
            <div
              style={{
                flex: 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                 
                  //   alignItems: "center",
                }}
              >
                <img
                  src={founder}
                  alt="founder"
                  className="img-fluid"
                  style={{ width: 250, marginLeft: 50 }}
                />
                <h4 style={{ color: "#603200", marginLeft: 65 }}>
                  Sandip Chothave
                </h4>
                <h5>Founder & CEO Plywood Bazar.com</h5>
              </div>
            </div>
          </div>
        </div> */}




      {/* <div className="Container">
        <h4 style={{ color: "#603200" }}>Company Vision</h4>
        <ul>
          <li>
            Plywood Bazar.com is a startup that is working to improve this
            unorganized furniture , interior and exterior industry by co-ordinate
            in between them. Providing large potential market exposure for
            business expansion.
          </li>
          <li>
            In this final chapter of our B2B website saga, we celebrate the power
            of collaboration and the pursuit of excellence. We believe that true
            success is not achieved in isolation but through the collective
            efforts of a united ecosystem.
          </li>
          <li>
            In this chapter, we invite our partners to join us in a journey
            towards achieving excellence. Together, we set high standards,
            challenge mediocrity, andstrive for continuous improvement. We foster
            a culture of excellence that permeates every aspect of our businesses,
            from product development and service delivery to customer satisfaction
            and beyond.
          </li>
          <li>
            In this chapter, we also emphasize the importance of collaboration
            <strong> and synergy. </strong> We believe that the collective intelligence and diverse
            perspectives of our partners are the key drivers of innovation and
            success. By fostering a collaborative environment, we encourage the
            exchange of ideas, cross pollination of expertise, and the co-
            creation of solutions that surpass individual capabilities.
          </li>
          <li>
            As we strive for excellence, we also recognize the significance of
            recognizing and celebrating achievements. We acknowledge the hard
            work, dedication, and milestones reached by our partners, and we take
            pride in their accomplishments. Through recognition programs, awards,
            and shared success stories, we inspire and motivate each other to
            reach new heights.
          </li>
          <li>
            in this final chapter of our saga, we invite you to join us in the
            pursuit <strong> of excellence.</strong> Together, let's push the boundaries, exceed
            expectations, andcreate a legacy of remarkable achievements. Through
            our collective commitment to excellence and our unwavering support for
            one another, we will forge a future where success knows no bounds.
          </li>
        </ul>
      </div> */}
    </div>
  );
}
