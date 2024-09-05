import React from "react";
import { AiOutlineSafety, AiOutlineStar } from "react-icons/ai";
import { RiMessage2Line } from "react-icons/ri";
import aboutimg from "../../src/assets/images/category_1.jfif";
import teamimg from "../../src/assets/images/about_imga.jpg";
import { BiStore } from "react-icons/bi";
import { MdOutlineVerified } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
import { Link } from "react-router-dom";
import successgif from "../assets/images/verified.gif";

const Thankyou = () => {
  return (
    <div>
      <main>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="thankucard">
                  <img  src={successgif } alt="" className="main-logo img-fluid mb-5" />
                  <h1 className="heading mb-4">Thank You!</h1>
                  <h5 className="mb-4"><strong>Visiting Again </strong></h5>
                  <a className="btn btn-custom btn-yellow mt-2" href="/">
                    Go to Home
                  </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Thankyou;
