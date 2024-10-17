import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { errorToast } from "./Utility/Toast";
import { phonepePaymentStatusCheck, verifyPayment } from "../services/UserSubscription.service";
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
  const [errormsg, seterrormsg] = useState("")


  const searchParams = new URLSearchParams(location.search);

  const oserno = searchParams.get('orderId');
  console.log('hgtdf', orderId)
  useEffect(() => {
    if (oserno === null) {
      // setOrderId(params.id)
      handlePhonePaymentCallback(params.id);

    } else {
      setOrderId(params.id);



      handlePaymentHDFCCallback(oserno);
    }
  }, [params, location.search])


  const handlePhonePaymentCallback = async (id) => {
    try {
      setOrderStatus(1);
      // let { data: res } = await phonepePaymentStatusCheck(id);
      // if (res.data) {
      // } else {
      //   setOrderStatus(2);

      //   // setTimeout(()=>{
      //   //   navigate('/')
      //   // },3000)

      // }
    } catch (error) {
      // errorToast(error)
      // setOrderStatus(2);

      // setTimeout(()=>{
      //   navigate('/')
      // },3000)
    }
  }


  const handlePaymentHDFCCallback = async (id) => {
    try {
      setOrderStatus(1);
      let { data: res } = await verifyPayment({ orderId: oserno });

      // Handle successful response
      settxn_id(res.txn_id);
      setOrderIds(res.orderId);
      seteffective_amount(res.effective_amount);
      settxn_uuid(res.txn_uuid);
      setTxOrderStatus(res.status);
      seterrormsg(res.message)

    } catch (error) {
      // Check if error has a response with data

      const res = error.response.data;  // Extracting the response from the error object
      seterrormsg(error.response.data.message)
      // Handle the response even when it's an error
      settxn_id(res.txn_id);
      setOrderIds(res.orderId);
      seteffective_amount(res.effective_amount);
      settxn_uuid(res.txn_uuid);
      setTxOrderStatus(res.status);

      setOrderStatus(2);  // Set order status as failed


      // Redirect back to homepage after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 120000);
    }
  };


  return (
    <>

      {oserno === null ?
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
                    <h5>{`Please Contact Admin for Subscription Problem ${errormsg}`} </h5>
                    <h5>{`${errormsg}`} </h5>
                    <p className=" my-5">
                      Your Payment ID is &nbsp;:&nbsp;
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
        :

        <main>
          <section className="ptb-50 order-complete">
            <div className="container">
              <div className="row text-center my-5">
                {/* Always show transaction details */}
                <div className="col-12 col-md-8 col-lg-6 mx-auto">
                  {txOrderStatus === "CHARGED" ? (
                    <h2>
                      Your Payment has been received{" "}
                      <span className="emoji" role="img">
                        🥳
                      </span>
                    </h2>
                  ) : (
                    <h4>Payment Failed: Technical Issue Encountered during Subscription Process</h4>
                  
                  )}

                  <h5>{txOrderStatus === "CHARGED" ? "Thank you for your Payment!" : `Please Contact Admin for Subscription Problem`}</h5>
                  <h4  style={{color:'red'}}>{txOrderStatus === "CHARGED" ? "" : `${errormsg}`}</h4>


                  {/* Transaction details table */}
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
                        <td className="green fw-semibold">
                          {txOrderStatus === "CHARGED" ? "Success" : "Failed"}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {txOrderStatus === "CHARGED" && (
                    <p className="mt-4">
                      You will receive a booking confirmation email on your registered email ID.
                    </p>
                  )}
                </div>

                {orderStatus === 0 && (
                  <div className="col-12 col-md-8 col-lg-6 mx-auto">
                    <h3>Please Wait</h3>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      }

    </>
  );
}

export default Payment;