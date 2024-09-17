import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sentOtp, login } from "../redux/actions"; // Import your action creators
import { successToast, errorToast } from "../utils/toast"; // Import your toast notifications

const LoginModal = ({ signInModal, setSignInModal }) => {
  const [loginByEmail, setLoginByEmail] = useState(true);
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpsent, setOtpSent] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlesLogin = async () => {
    if (otp === "") {
      errorToast("Please Enter Otp");
      return;
    }
    const obj = { phone: mobile, otp };
    dispatch(login(obj));
    setSignInModal(false);
  };

  const handleRegister = () => {
    setSignInModal(false);
    navigate("/Register");
  };

  const handlesendOtp = async () => {
    try {
      if (loginByEmail) {
        if (email === "") {
          errorToast("Please Enter email");
          return;
        }
        if (!email.includes("@") || !email.includes(".")) {
          errorToast("Please Enter a valid email");
          return;
        }
      } else {
        if (mobile.length !== 10) {
          errorToast("Please Enter Mobile Number");
          return;
        }
      }

      const obj = { phone: mobile, email };
      const { data: res } = await sentOtp(obj);
      if (res.message) {
        successToast(res.message);
        setOtpSent(true);
      }
    } catch (error) {
      errorToast(error.message);
    }
  };

  const resendOtp = async () => {
    try {
      if (mobile === "") {
        errorToast("Please Enter Mobile Number");
        return;
      }
      const obj = { phone: mobile };
      const { data: res } = await sentOtp(obj);
      if (res.message) {
        successToast(res.message);
      }
    } catch (error) {
      errorToast(error.message);
    }
  };

  return (
    <Modal show={signInModal} centered onHide={() => setSignInModal(false)} className="rounded-5">
      <Modal.Body className="sign-in-modal custom-modal subscription-card-container rounded-5">
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={() => setSignInModal(false)}
        ></button>
        <div>
          <Link to="/" className="navbar-brand">
            <img src="/path/to/logo.png" alt="Logo" className="main-logo img-fluid" />
          </Link>
        </div>
        <h2 className="heading">LogIn via</h2>
        <form className="form row">
          {loginByEmail ? (
            <div className="col-12">
              {otpsent ? (
                <div className="input flex-1">
                  <label className="text-start">Enter OTP sent to {mobile}</label>
                  <input
                    type="text"
                    className="w-100 form-control bg-grey"
                    placeholder="Enter Your OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
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
                  <label className="text-start">Enter OTP sent to {mobile}</label>
                  <input
                    type="text"
                    className="w-100 form-control bg-grey"
                    placeholder="Enter Your OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <div className="text-end">
                    <div className="resendtp" onClick={resendOtp}>
                      Resend OTP
                    </div>
                  </div>
                </div>
              ) : (
                <div className="input flex-1">
                  <label className="text-start">Phone number</label>
                  <input
                    type="number"
                    className="w-100 form-control bg-grey"
                    placeholder="Enter Your Mobile Number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
              )}
            </div>
          )}

          <div className="col-12">
            {otpsent ? (
              <button
                type="button"
                onClick={handlesLogin}
                className="btn btn-custom text-white yellow-bg py-2 w-100"
              >
                Verify
              </button>
            ) : (
              <button
                type="button"
                onClick={handlesendOtp}
                className="btn btn-custom text-white yellow-bg py-2 w-100"
              >
                Submit
              </button>
            )}

            <Link
              to="/Register"
              onClick={handleRegister}
              className="btn btn-custom mt-2 text-white yellow-bg py-2 w-100"
            >
              Register Now
            </Link>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
