import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { errorToast } from "./Utility/Toast";
import { phonepePaymentStatusCheck } from "../services/UserSubscription.service";
function Payment() {
  const params = useParams();
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState(0);

  useEffect(() => {
    if (params.id) {
      setOrderId(params.id)
      handlePhonePaymentCallback(params.id);
    }
  }, [])


  const handlePhonePaymentCallback = async (id) => {
    try {
      setOrderStatus(1);
      let { data: res } = await phonepePaymentStatusCheck(id);
      if (res.data) {
      } else {
        setOrderStatus(2);

        setTimeout(()=>{
          navigate('/')
        },3000)

      }
    } catch (error) {
      // errorToast(error)
      // setOrderStatus(2);

      // setTimeout(()=>{
      //   navigate('/')
      // },3000)
    }
  }
  return (

    <main>
      <section className="ptb-50 order-complete">
        <div className="container">
          <div className="row text-center my-5">{
            orderStatus == 1 && (<div className="col-12 col-md-8 col-lg-6 mx-auto">
              <h2>
                Your Payment has been received
                <span className="emoji" role="img">
                  🥳
                </span>
              </h2>
              {/* <img src={images.party} alt="" className="mt-4 mb-5" /> */}
              <h5>Thank you for your Payment!</h5>
              <p className=" my-5">
                Your Payment ID is&nbsp;:&nbsp;
                <span className="green fw-semibold">{orderId}</span>
              </p>
              <p>
                You will receive a booking confirmation email on registerd Email Id.
              </p>

            </div>)
          }
            {orderStatus == 2 && (
              <div className="col-12 col-md-8 col-lg-6 mx-auto">
                <h3>Payment Failed: Technical Issue Encountered during Subscription Process</h3>
                {/* <img src={images.party} alt="" className="mt-4 mb-5" /> */}
                <h5>Please Contact Admin for Subscription Problem</h5>
                <p className=" my-5">
                  Your Payment ID is&nbsp;:&nbsp;
                  <span className="green fw-semibold">{orderId}</span>
                </p>


              </div>)
            }

            {orderStatus == 0 && (
              <div className="col-12 col-md-8 col-lg-6 mx-auto">
                <h3>Please Wait</h3>




              </div>)
            }
          </div>
        </div>
      </section>

    </main>
  );
}

export default Payment;
