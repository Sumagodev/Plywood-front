import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams,useLocation  } from "react-router-dom";
import { errorToast } from "./Utility/Toast";
import { phonepePaymentStatusCheck } from "../services/UserSubscription.service";
function Payment() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [orderId, setOrderId] = useState("");
  const [orderIds, setOrderIds] = useState("");
  const [orderStatus, setOrderStatus] = useState(0);
  const [txn_id, settxn_id] = useState("");
  const [effective_amount, seteffective_amount] = useState("");
  const [txn_uuid, settxn_uuid] = useState("");
  const [txOrderStatus, setTxOrderStatus] = useState(false);

  // useEffect(() => {
  //   if (params.id) {
  //     setOrderId(params.id)
  //     setOrderIds(req.params?.orderId)
  //     settxn_id(params?.txn_id)
  //     settxn_uuid(params?.txn_uuid)
  //     seteffective_amount(params?.effective_amount)
  //     handlePhonePaymentCallback(params.id);

  //   }
  // }, [])
  useEffect(() => {
    if (params.id) {
      // Set the orderId from URL params
      setOrderId(params.id);

      // Parse the query parameters
      const searchParams = new URLSearchParams(location.search);
      settxn_id(searchParams.get('txn_id'));
      setOrderIds(searchParams.get('orderId'))
      seteffective_amount(searchParams.get('effective_amount'));
      settxn_uuid(searchParams.get('txn_uuid'));
      setTxOrderStatus(searchParams.get('orderStatus'));

      // Call the payment callback function
      handlePhonePaymentCallback(params.id);
    }
  }, [params, location.search]);

  const handlePhonePaymentCallback = async (id) => {
    try {
      setOrderStatus(1);
      let { data: res } = await phonepePaymentStatusCheck(id);
      if (res.data) {
      } else {
        setOrderStatus(2);

        setTimeout(() => {
          navigate('/')
        }, 3000)

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
            orderStatus == 1 && (
              <div className="col-12 col-md-8 col-lg-6 mx-auto">
                <h2>
                  Your Payment has been received
                  <span className="emoji" role="img">
                    🥳
                  </span>
                </h2>
                {/* <img src={images.party} alt="" className="mt-4 mb-5" /> */}
                <h5>Thank you for your Payment!</h5>

                {/* Aligning information in table format */}
                <table className="table table-bordered mt-5">
                  <tbody>
                    <tr>
                      <td className="fw-semibold">Payment ID:</td>
                      <td className="green fw-semibold">{orderId}</td>
                    </tr>
                    <tr>
                      <td className="fw-semibold">Order ID:</td>
                      <td className="green fw-semibold">{orderIds}</td>
                    </tr>
                    <tr>
                      <td className="fw-semibold">Transaction ID:</td>
                      <td className="green fw-semibold">{txn_id}</td>
                    </tr>
                    <tr>
                      <td className="fw-semibold">Transaction UUID:</td>
                      <td className="green fw-semibold">{txn_uuid}</td>
                    </tr>
                    <tr>
                      <td className="fw-semibold">Amount:</td>
                      <td className="green fw-semibold">{effective_amount}</td>
                    </tr>
                    <tr>
                      <td className="fw-semibold">Order Status:</td>
                      <td className="green fw-semibold">{txOrderStatus === "CHARGED" ? "Success" : "Failed"}</td>
                    </tr>
                  </tbody>
                </table>

                <p className="mt-4">
                  You will receive a booking confirmation email on your registered email ID.
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
