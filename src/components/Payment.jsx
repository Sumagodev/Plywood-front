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

  const searchParams = new URLSearchParams(location.search);

  const oserno = searchParams.get('orderId');

  const handlePhonePaymentCallback = async (id) => {
    try {
      setOrderStatus(1);
      let { data: res } = await verifyPayment({ orderId: oserno });

      // Handle successful response
      settxn_id(res.txn_id);
      setOrderIds(res.orderId);
      seteffective_amount(res.effective_amount);
      settxn_uuid(res.txn_uuid);
      setTxOrderStatus(res.status);

    } catch (error) {
      // Check if error has a response with data

        const res = error.response.data;  // Extracting the response from the error object

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
      }, 3000);
    }
  };

  useEffect(() => {
    if (params.id) {
      // Set the orderId from URL params
      setOrderId(params.id);



      handlePhonePaymentCallback(params.id);
    }
  }, [params, location.search]);
  return (

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
                <h3>Payment Failed: Technical Issue Encountered during Subscription Process</h3>
              )}

              <h5>{txOrderStatus === "CHARGED" ? "Thank you for your Payment!" : "Please Contact Admin for Subscription Problem"}</h5>

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
  );
}

export default Payment;
