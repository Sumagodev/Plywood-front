import React from "react";
import founder from "../assets/images/founder.jpeg";
export default function Moto() {
  return (
    <div className="dataContainer container my-5">
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
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex flexunset">
            <div
              style={{
                flex: 0.3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <h4 style={{ color: "#603200" }}>Let’s go together.</h4>
                <h4 style={{ color: "#603200" }}>Let’s grow together.</h4>
              </div>
            </div>
            <div
              style={{
                flex: 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
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
        </div>
      </div>
    </div>
  );
}
