import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteFlashSalebyId,
  getAllFlashSalesbyUserId,
} from "../../services/FlashSales.service";
import { getAllsubscription } from "../../services/Subscription.service";
import { buySubscription } from "../../services/UserSubscription.service";
import { errorToast, successToast } from "../Utility/Toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toastSuccess } from "../../utils/toastutill";
import { getUserById } from "../../services/User.service";
import { Container, Row, Col } from "react-bootstrap";
import '../../assets/css/myflashseles.css'
export default function MyFlashSales() {
  const navigate = useNavigate();
  let userObj = useSelector((state) => state.auth.user);
  let id = useSelector((state) => state.auth.user._id);

  const [flashSalesArr, setFlashSalesArr] = useState([]);
  const [userSubscriptionExpired, setUserSubscriptionExpired] = useState(true);
  const [userDataObj, setUserDataObj] = useState({});

  const handleGetSales = async (id) => {
    try {
      let { data: res } = await getAllFlashSalesbyUserId(id);
      if (res.data) {
        console.log(res.data);

        setFlashSalesArr(res.data);
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const handleGetUser = async () => {
    try {
      let { data: res } = await getUserById(id);
      if (res.data) {
        setUserDataObj(res.data);
        setUserSubscriptionExpired(res.data.userSubscriptionExpired);
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const handleDeleteFlashSale = async (id) => {
    try {
      let { data: res } = await deleteFlashSalebyId(id);
      if (res.message) {
        toastSuccess(res.message);
        handleGetSales(userObj._id);
      }
    } catch (err) {
      errorToast(err);
    }
  };

  useEffect(() => {
    if (userObj) {
      handleGetSales(userObj._id);
      handleGetUser();
    }
  }, [userObj]);

  const handleRedirectToEditScreen = async (id) => {
    navigate(`/AddFlashSale?id=${id}`);
  };

  return (
    <div className="container-fluid subscription-container topup-subscription-container">
      <div className="container">
        <div className="row me-2  d-flex justify-content-between">
          <div className="col-lg-8 col-md-8 col-sm-12 subsctiption-heading">
            Your Flash-Sales
          </div>
          {userDataObj?.numberOfSales > 0 &&
            !userSubscriptionExpired &&
            !userDataObj?.isBlocked ? (

              <div className="col-lg-4 col-md-4 col-sm-12 justify-content-end mt-5">
              <div className="mt-0">
                <div className="row d-flex justify-content-end">
                  <button
                    className="theme-outline-button no-margin-top" // Updated class to remove top margin
                    onClick={() => navigate("/AddFlashSale")}
                  >
                    Create a flash sale
                  </button>
                </div>
              </div>
            </div>
            
          ) : (
            userDataObj?.numberOfSales <= 0 &&
            userSubscriptionExpired &&
            !userDataObj?.isBlocked && (
              <div className="col-6 col-sm-4 mt-5 justify-content-end">
                <div className="row d-flex justify-content-end">
                  <button
                    className="theme-outline-button"
                    onClick={() => navigate("/Topup")}
                  >
                    Purchase a subscription
                  </button>
                </div>
              </div>
            )
          )}
        </div>
        {(userSubscriptionExpired || userDataObj?.numberOfSales <= 0) && (
          <div className="subscription-description">
            You do not have a valid subscription , subscribe one to add a flash
            sale
          </div>
        )}
        {userDataObj?.isBlocked && (
          <div className="subscription-description">
            Your subscription has been blocked by admin please contact admin for
            further details
          </div>
        )}
        <div className="row mt-4">
          <div className="col-12 col-sm-12 col-md-12">
            <div className="row d-flex justify-content-between">
              {flashSalesArr && flashSalesArr.length > 0 ? (
                flashSalesArr.map((el, index) => {
                  return (
                    <div
                      key={index}
                      className="profile-section-container col-lg-4 col-12"
                      style={{ background: "#F5F1E8", boxShadow: "12px 14px 35px 0px #00000040" }}
                    >
                      <div className="row">
                        <div className="col-3">
                          {/* <h4><b>{el?.userObj?.name}</b></h4> */}
                        </div>
                        <div className="col-9 d-flex justify-content-end">
                          <div
                            className="theme-outline-button"
                            onClick={() => handleRedirectToEditScreen(el._id)}
                            style={{ fontSize: 12, padding: "4px 10px" }}
                          >
                            <FaEdit />
                            {/* Created On -  {moment(el?.createdAt).format("DD-MM-YYYY")} */}
                          </div>
                          <div
                            className="theme-outline-button ms-2"
                            onClick={() => handleDeleteFlashSale(el._id)}
                            style={{ fontSize: 12, padding: "4px 10px" }}
                          >
                            <FaTrash />
                            {/* Created On -  {moment(el?.createdAt).format("DD-MM-YYYY")} */}
                          </div>
                        </div>
                      </div>


                      <div className="row mt-4 col-12">
                        <div className="col-6  my-1">Product Name:</div>
                        <div className="col-6    my-1">{el?.productId?.name}</div>
                        <div className="col-6 my-1">Sale Price:</div>
                        <div className="col-6  my-1">{el?.salePrice}</div>
                        <div className="col-6 my-1">Price:</div>
                        <div className="col-6  my-1">{el?.price}</div>
                        <div className="col-6 my-1">Start Date:</div>
                        <div className="col-6  my-1">
                          {moment(el?.startDate).format("DD-MM-YYYY")}
                        </div>
                        <div className="col-6 my-1">End Date:</div>
                        <div className="col-6  my-1">
                          {moment(el?.endDate).format("DD-MM-YYYY")}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="subscription-description">
                  You do not have any flash sales yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
