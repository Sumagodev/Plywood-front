import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { generateImageUrl } from '../../services/url.service';
import { getUserById } from '../../services/User.service';
import { getAllSubscriptionbyUserId, usersubscriptionMailId } from '../../services/UserSubscription.service';
import { ROLES_CONSTANT } from '../Utility/constant';
import { errorToast } from '../Utility/Toast';
import { toastSuccess } from '../../utils/toastutill';
import "../../assets/css/Subscription.css"

export default function MySubscriptions() {
    let role = useSelector(state => state.auth.role)
    let id = useSelector(state => state.auth.user._id)
    const [userObj, setUserObj] = useState({});
    const navigate = useNavigate()
    const [userSubscriptionsArr, setUserSubscriptionsArr] = useState([]);


    const handleGetUserSubscription = async () => {
        try {
            let { data: res } = await getAllSubscriptionbyUserId(id)
            console.log(res, "dataa")
            if (res.data) {
                // let tempArr = res.data.map((el, i) => {
                //     let obj = {
                //         ...el
                //     }
                //     if (i == 0) {
                //     }
                //     else {
                //     }
                //     return obj
                // })
                setUserSubscriptionsArr(res.data);
            }
        }
        catch (err) {
            errorToast(err)
        }
    }

    const handlemailUserSubscription = async (id) => {
        try {
            let { data: res } = await usersubscriptionMailId(id)
            console.log(res, "dataa")
            if (res.message) {
                toastSuccess(res.message)
            }
        }
        catch (err) {
            errorToast(err)
        }
    }

    useEffect(() => {
        handleGetUserSubscription()

    }, [])

    return (
        <div className='container-fluid py-5 mysubscription-main-container topup-subscription-container'>
            <div className=' container'>

                <div className="row d-flex justify-content-between align-items-center mysubscription-heading-container">
                    <div className="col-12 col-sm-6 my-2 profile-section-Heading mysubcripterfong fs-2 fw-bold d-flex justify-content-center">My Subscriptions</div>
                    <div className="col-12 col-sm-6 d-flex justify-content-center">
                        <button className="theme-outline-button " onClick={() => navigate("/Subscription")}>
                            Purchase a subscription
                        </button>
                    </div>
                    {
                        userSubscriptionsArr && !(userSubscriptionsArr.length > 0) &&
                        <div className="subscription-container ms-2 mt-2">
                            <div className="subscription-description">
                                You have not purchased a subsctiption yet, subscribe to one now to utilise full capabilities of your account
                            </div>
                        </div>
                    }
                </div>

                <div className="rounded">
                    <div className="row mt-4 d-flex justify-content-between">
                        {
                            userSubscriptionsArr && userSubscriptionsArr.length > 0 && userSubscriptionsArr.map((el, index) => {
                                return (
                                    <div className='col-lg-6'>
                                        <div key={index} className='profile-section-container my-3'>
                                            <div className="row align-items-center sub-section-1">
                                                <div className="col-12 col-sm-5 my-2 fs-4 text-white fw-bold text-center">
                                                    {el?.name}
                                                </div>
                                                <div className="col-12 col-sm-7 d-flex justify-content-center">
                                                    <div className="theme-outline-button">
                                                        Purchased On -  {new Date(el?.createdAt).toDateString()}
                                                    </div>
                                                    <button type='button' onClick={() => handlemailUserSubscription(el._id)} className="theme-outline-button ms-3">
                                                        SEND MAIL
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="row mt-3 sub-section-2" >
                                                <div className="col-5 fw-bold">
                                                    Description:
                                                </div>
                                                <div className="col-7">
                                                    {el?.description} {el._id}
                                                </div>
                                                <div className="col-5 fw-bold">
                                                    Price (₹):
                                                </div>
                                                <div className="col-7">
                                                    ₹ {el?.price}
                                                </div>
                                                <div className="col-5 fw-bold">
                                                    Starts On:
                                                </div>
                                                <div className="col-7">
                                                    {new Date(el?.startDate).toDateString()}
                                                </div>
                                                <div className="col-5 fw-bold">
                                                    Expires On:
                                                </div>
                                                <div className="col-7">
                                                    {new Date(el?.endDate).toDateString()}
                                                </div>
                                                <div className="col-5 fw-bold">
                                                    Number of Advertisement:
                                                </div>
                                                <div className="col-7">
                                                    {el.numberOfAdvertisement} for {el?.advertisementDays} days
                                                    {/* noOfMonth */}
                                                </div>
                                                <div className="col-5 fw-bold">
                                                    Number Of Sales:
                                                </div>
                                                <div className="col-7">
                                                    {el?.numberOfSales ? el?.numberOfSales : 0} for {el?.saleDays} days
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>


                </div>
            </div>
        </div>
    )
}
