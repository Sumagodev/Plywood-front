import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { generateImageUrl } from '../../services/url.service';
import { getUserById } from '../../services/User.service';
import { getAllSubscriptionbyUserId, usersubscriptionMailId } from '../../services/UserSubscription.service';
import { ROLES_CONSTANT } from '../Utility/constant';
import { errorToast } from '../Utility/Toast';
import { toastSuccess } from '../../utils/toastutill';

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
        <div className='container my-5'>

            <div className="row d-flex justify-content-between align-items-center">
                <div className="col-6 col-sm-7 pt-2 profile-section-Heading mysubcripterfong">My Subscriptions</div>
                <div className="col-6 col-sm-5">
                        <button className="theme-outline-button " onClick={() => navigate("/Subscription")}>
                            Purchase a subscription
                        </button>
                </div>
                {
                    userSubscriptionsArr && !(userSubscriptionsArr.length > 0) &&
                    <div className="subscription-container ms-2 mt-3">
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
                                <div key={index} className='profile-section-container'>
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <h4 className='mysubcripterfong'><b>{el?.name}</b></h4>
                                        </div>
                                        <div className="col-12 col-sm-7 d-flex justify-content-end">
                                            <div className="theme-outline-button">
                                                Purchased On -  {new Date(el?.createdAt).toDateString()}
                                            </div>
                                            <button type='button' onClick={()=>handlemailUserSubscription(el._id)} className="theme-outline-button ms-3">
                                            SEND MAIL
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row mt-3" >
                                        <div className="col-5">
                                            Description:
                                        </div>
                                        <div className="col-7">
                                            {el?.description} {el._id}
                                        </div>
                                        <div className="col-5">
                                            Price (₹):
                                        </div>
                                        <div className="col-7">
                                            ₹ {el?.price}
                                        </div>
                                        <div className="col-5">
                                            Starts On:
                                        </div>
                                        <div className="col-7">
                                            {new Date(el?.startDate).toDateString()}
                                        </div>
                                        <div className="col-5">
                                            Expires On:
                                        </div>
                                        <div className="col-7">
                                            {new Date(el?.endDate).toDateString()}
                                        </div>
                                        <div className="col-5">
                                            Number of Advertisement:
                                        </div>
                                        <div className="col-7">
                                            {el.numberOfAdvertisement} for {el?.advertisementDays} days
                                            {/* noOfMonth */}
                                        </div>
                                        <div className="col-5">
                                            Number Of Sales:
                                        </div>
                                        <div className="col-7">
                                            {el?.numberOfSales ? el?.numberOfSales : 0} for {el?.saleDays} days
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>


            </div>
        </div>
    )
}
