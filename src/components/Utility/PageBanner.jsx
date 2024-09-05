import React from "react";
import { FaPhoneAlt, FaEdit, FaUserFriends } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { generateImageUrl } from "../../services/url.service";

function PageBanner({ img, title, desp, className, edit, userId }) {
  const navigate = useNavigate()

  return (
    <section
      onClick={() => window.open(img)}
      className={`page-banner
         ${className ? className : ""}`}
      style={{ backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", position: "relative" }}
    >
      <div className="container-fluid">
        {
          edit &&
          <div onClick={() => { navigate("/Edit-Profile") }} style={{ position: "absolute", top: 10, right: 20, border: "solid 1px white", borderRadius: 110 }}>
            <FaEdit color="white" />
          </div>
        }
        <div className="row justify-content-center">
          <div className="col-12 col-lg-6">
            <div className="content">
              {title && <h1 className="heading">{title}</h1>}
              {desp && <p className="desp">{desp}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageBanner;
